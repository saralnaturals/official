/* eslint-disable */

import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { signToken } from '@/lib/jwt';
import * as bcrypt from 'bcryptjs';
import { rateLimit } from '@/lib/rateLimit';
import { isEmail, isNonEmptyString } from '@/lib/validators';
import { cookieOptionsForToken } from '@/lib/cookies';
import crypto from 'crypto';

function getIp(req: Request) {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const rl = rateLimit(ip, 20, 60 * 1000);
    if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const body = await req.json();
    let { email, password, encrypted } = body;

    // if client sent encrypted password (base64, RSA-OAEP), decrypt using server private key
    if (encrypted) {
      const pk = process.env.PRIVATE_KEY;
      if (!pk) return NextResponse.json({ error: 'Server misconfigured: PRIVATE_KEY missing' }, { status: 500 });
      try {
        const buf = Buffer.from(password, 'base64');
        const dec = crypto.privateDecrypt({ key: pk, oaepHash: 'sha256' }, buf);
        password = dec.toString('utf8');
      } catch (e) {
        return NextResponse.json({ error: 'Failed to decrypt password' }, { status: 400 });
      }
    }

    if (!isEmail(email) || !isNonEmptyString(password)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('saral');
    const users = db.collection('users');

  const user = await users.findOne({ email });
    if (!user) {
      if (process.env.NODE_ENV !== 'production') console.log('[auth/login] no user found for', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const match = user.password ? bcrypt.compareSync(password, user.password) : false;
    if (!match) {
      if (process.env.NODE_ENV !== 'production') console.log('[auth/login] failed password compare for', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload: any = { email: user.email, role: user.role || 'investor' };
    const token = signToken(payload);

  const res = NextResponse.json({ ok: true, ...(process.env.NODE_ENV !== 'production' ? { token } : {}) });
  // set cookie (httpOnly) with safer options
  res.cookies.set('sn_token', token, cookieOptionsForToken(true));
  // set a csrf cookie for subsequent mutating requests; accessible from client
  const csrf = Math.random().toString(36).slice(2);
  res.cookies.set('sn_csrf', csrf, { path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    return res;
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

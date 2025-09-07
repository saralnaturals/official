import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { getTokenPayload } from '@/lib/auth';
import * as bcrypt from 'bcryptjs';
import { rateLimit } from '@/lib/rateLimit';
import { isEmail, isNonEmptyString, validateCsrf } from '@/lib/validators';
import type { Document } from 'mongodb';

function getIp(req: Request) {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const rl = rateLimit(ip, 30, 60 * 1000);
    if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const payload = getTokenPayload(req) as { email?: string; role?: string } | null;
    if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!validateCsrf(req)) return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });

  const body = await req.json() as Partial<{ email: string; password: string; name: string; phone?: string; role?: string; investedAmount?: number; returnPct?: number; avatar?: string }>;
    // body may include avatar (data URL). validate minimal fields
    if (!isEmail(body.email) || !isNonEmptyString(body.password) || !isNonEmptyString(body.name)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('saral');
    const users = db.collection('users');
    // expected body: { email, password, name, phone, role, investedAmount, returnPct }
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }
  const insertPayload: Record<string, unknown> = { email: body.email, password: body.password, name: body.name, role: body.role || 'investor' };
  if (body.phone) insertPayload['phone'] = body.phone;
  if (body.investedAmount) insertPayload['investedAmount'] = body.investedAmount;
  if (body.returnPct) insertPayload['returnPct'] = body.returnPct;
  if (body.avatar) insertPayload['avatar'] = body.avatar;
  const r = await users.insertOne(insertPayload as Document);
  const created = await users.findOne({ _id: r.insertedId }) as Document | null;
  let sanitizedUser: Record<string, unknown> | null = null;
  if (created) {
    sanitizedUser = { ...created } as Record<string, unknown>;
    if ('password' in sanitizedUser) delete sanitizedUser.password;
  }
  return NextResponse.json({ ok: true, user: sanitizedUser });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  const ip = getIp(req);
  const rl = rateLimit(ip, 120, 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const payload = getTokenPayload(req) as { email?: string; role?: string } | null;
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await getMongoClient();
  const db = client.db('saral');
  const users = db.collection('users');
  const list = await users.find().toArray();
  list.forEach(u => { if (u.password) delete u.password; });
  return NextResponse.json({ users: list });
  } catch (_err) {
    return NextResponse.json({ error: String(_err) }, { status: 500 });
  }
}

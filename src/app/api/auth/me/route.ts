/* eslint-disable */

import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { getMongoClient } from '@/lib/mongo';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('cookie')?.split('sn_token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ user: null });
    const payload: any = verifyToken(token);
    if (!payload) return NextResponse.json({ user: null });

    const client = await getMongoClient();
    const db = client.db('saral');
    const users = db.collection('users');
    const user = await users.findOne({ email: payload.email });
    if (user && user.password) delete user.password;
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

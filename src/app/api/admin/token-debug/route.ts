import { NextResponse } from 'next/server';
import { getTokenPayload } from '@/lib/auth';

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  const payload = getTokenPayload(req);
  if (!payload) return NextResponse.json({ error: 'No token or invalid token' }, { status: 401 });
  return NextResponse.json({ payload });
}

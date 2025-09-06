import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { getTokenPayload } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
    const rl = rateLimit(ip, 60, 60 * 1000);
    if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const payload = getTokenPayload(req) as { email?: string; role?: string } | null;
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    if (!q) return NextResponse.json({ users: [] });

    const client = await getMongoClient();
    const db = client.db('saral');
    const users = db.collection('users');

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const list = await users.find({ $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }] })
      .project({ password: 0 })
      .limit(20)
      .toArray();

    return NextResponse.json({ users: list });
  } catch (_err) {
    return NextResponse.json({ error: String(_err) }, { status: 500 });
  }
}

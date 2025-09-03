import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { getTokenPayload, extractTokenFromRequest } from '@/lib/auth';
import * as bcrypt from 'bcryptjs';
import { rateLimit } from '@/lib/rateLimit';
import { isEmail, isNonEmptyString, validateCsrf } from '@/lib/validators';

function getIp(req: Request) {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const rl = rateLimit(ip, 30, 60 * 1000);
    if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const payload: any = getTokenPayload(req);
    if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!validateCsrf(req)) return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });

    const body = await req.json();
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
    await users.insertOne(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  const ip = getIp(req);
  const rl = rateLimit(ip, 120, 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const payload: any = getTokenPayload(req);
  // DEV: helpful debug logging when running locally to understand 401 causes
  if (process.env.NODE_ENV !== 'production') {
    try {
      const token = extractTokenFromRequest(req);
      // eslint-disable-next-line no-console
      console.debug('[dev-debug] /api/admin/users GET token present:', !!token, ' token:', token ? token.slice(0, 20) + '...' : null, ' payload:', payload);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug('[dev-debug] /api/admin/users GET logging failed', String(e));
    }
  }
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await getMongoClient();
  const db = client.db('saral');
  const users = db.collection('users');
  const list = await users.find().toArray();
  list.forEach(u => { if (u.password) delete u.password; });
  return NextResponse.json({ users: list });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

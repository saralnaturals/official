import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { verifyToken } from '@/lib/jwt';
import { rateLimit } from '@/lib/rateLimit';
import { isNumberLike, isEmail, validateCsrf } from '@/lib/validators';

function getTokenFromReq(req: Request) {
  return req.headers.get('cookie')?.split('sn_token=')[1]?.split(';')[0];
}

function getIp(req: Request) {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
}

export async function GET(req: Request) {
  try {
    const ip = getIp(req);
    const rl = rateLimit(ip, 120, 60 * 1000);
    if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const token = getTokenFromReq(req);
    const payload: any = token ? verifyToken(token) : null;

    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    // allow admin to fetch any user; otherwise ensure requester is same email
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (payload.role !== 'admin' && payload.email !== email) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const client = await getMongoClient();
    const db = client.db('saral');
    const users = db.collection('users');
    const user = await users.findOne({ email });
    if (!user) return NextResponse.json({ error: 'not found' }, { status: 404 });
    if (user.password) delete user.password;
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  const ip = getIp(req);
  const rl = rateLimit(ip, 30, 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const token = getTokenFromReq(req);
  const payload: any = token ? verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!validateCsrf(req)) return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });

  const body = await req.json();
  const { email, investedAmount, returnPct } = body;
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  if (!isNumberLike(investedAmount) || !isNumberLike(returnPct)) return NextResponse.json({ error: 'invalid numbers' }, { status: 400 });

  // admin can update any user, non-admin can update only their own email
  if (payload.role !== 'admin' && payload.email !== email) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const client = await getMongoClient();
  const db = client.db('saral');
  const users = db.collection('users');
  await users.updateOne({ email }, { $set: { investedAmount, returnPct } });
  return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

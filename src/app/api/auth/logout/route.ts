import { NextResponse } from 'next/server';
import { clearCookieOptions } from '@/lib/cookies';

function validateCsrf(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const cookieToken = cookie.split('sn_csrf=')[1]?.split(';')[0];
  const header = req.headers.get('x-csrf-token');
  return !!cookieToken && header === cookieToken;
}

export async function POST(req: Request) {
  if (!validateCsrf(req)) return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sn_token', '', clearCookieOptions());
  res.cookies.set('sn_csrf', '', clearCookieOptions());
  return res;
}

import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import * as bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();
    if (!email || !otp || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const client = await getMongoClient();
    const users = client.db('saral').collection('users');
    const user = await users.findOne({ email });
    if (!user || !user.otpHash || !user.otpExpiry) return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    if (Date.now() > Number(user.otpExpiry)) return NextResponse.json({ error: 'OTP expired' }, { status: 400 });

    const match = bcrypt.compareSync(String(otp), String(user.otpHash));
    if (!match) return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });

    const hash = bcrypt.hashSync(password, 10);
    await users.updateOne({ _id: user._id }, { $set: { password: hash }, $unset: { otpHash: '', otpExpiry: '' } });

    // instruct client to clear session if any
    const res = NextResponse.json({ ok: true });
    res.cookies.set('sn_token', '', { path: '/', maxAge: 0 });
    res.cookies.set('sn_csrf', '', { path: '/', maxAge: 0 });
    return res;
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';
import { sendEmail } from '@/lib/email';
import * as bcrypt from 'bcryptjs';

function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const client = await getMongoClient();
    const users = client.db('saral').collection('users');
    const user = await users.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const otp = genOtp();
    const otpHash = bcrypt.hashSync(otp, 10);
    const expiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    await users.updateOne({ _id: user._id }, { $set: { otpHash, otpExpiry: expiry } });

    const subject = 'Your Saral Naturals OTP';
    const text = `Your OTP is ${otp}. It expires in 15 minutes.`;
    const html = `<p>Your OTP is <strong>${otp}</strong>. It expires in 15 minutes.</p>`;

    try {
      await sendEmail(email, subject, text, html);
    } catch {
      // don't leak email errors
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

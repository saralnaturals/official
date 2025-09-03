import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongo';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    // TODO: generate OTP, save to DB, send via Nodemailer
    // This is a placeholder
    console.log('Forgot password requested for', email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

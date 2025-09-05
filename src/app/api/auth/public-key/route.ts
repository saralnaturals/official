import { NextResponse } from 'next/server';

export async function GET() {
  const pk = process.env.PUBLIC_KEY;
  if (!pk) return NextResponse.json({}, { status: 204 });
  return NextResponse.json({ publicKey: pk });
}

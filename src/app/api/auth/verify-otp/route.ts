import { NextRequest, NextResponse } from 'next/server';
import { getOTPVerification } from '@/lib/database';
import { z } from 'zod';

const VerifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  type: z.enum(['password_reset', 'email_verification']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, type } = VerifyOTPSchema.parse(body);

    const otpRecord = await getOTPVerification(email, otp, type);
    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true,
      valid: true 
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
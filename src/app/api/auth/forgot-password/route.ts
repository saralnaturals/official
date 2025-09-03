import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createOTPVerification } from '@/lib/database';
import { sendOTPEmail, generateOTP } from '@/lib/email';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = ForgotPasswordSchema.parse(body);

    const user = await getUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ success: true });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await createOTPVerification({
      email,
      otp,
      type: 'password_reset',
      expiresAt,
      verified: false,
    });

    const emailResult = await sendOTPEmail(email, otp, 'password_reset');
    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
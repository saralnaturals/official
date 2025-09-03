import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUser, getOTPVerification, markOTPAsVerified } from '@/lib/database';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const ResetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, newPassword } = ResetPasswordSchema.parse(body);

    // Verify OTP
    const otpRecord = await getOTPVerification(email, otp, 'password_reset');
    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await updateUser(user._id!, { password: hashedPassword });

    // Mark OTP as verified
    await markOTPAsVerified(otpRecord._id!);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
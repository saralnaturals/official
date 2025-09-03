import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'product.saralnaturals@gmail.com',
    pass: process.env.EMAIL_PASSWORD, // App password from Gmail
  },
});

export async function sendOTPEmail(email: string, otp: string, type: 'password_reset' | 'email_verification') {
  const subject = type === 'password_reset' ? 'Password Reset OTP - Saral Naturals' : 'Email Verification OTP - Saral Naturals';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #059669; margin: 0;">Saral Naturals</h1>
          <p style="color: #6B7280; margin: 5px 0;">Simple, Sustainable, and Natural</p>
        </div>
        
        <h2 style="color: #374151; margin-bottom: 20px;">
          ${type === 'password_reset' ? 'Password Reset Request' : 'Email Verification'}
        </h2>
        
        <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
          ${type === 'password_reset' 
            ? 'You have requested to reset your password. Please use the following OTP to proceed:'
            : 'Please use the following OTP to verify your email address:'
          }
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; background-color: #F3F4F6; padding: 20px 30px; border-radius: 8px; border: 2px dashed #D1D5DB;">
            <span style="font-size: 32px; font-weight: bold; color: #059669; letter-spacing: 4px;">${otp}</span>
          </div>
        </div>
        
        <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">
          This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        
        <div style="text-align: center; color: #6B7280; font-size: 12px;">
          <p>© 2024 Saral Naturals. All rights reserved.</p>
          <p>Contact: product.saralnaturals@gmail.com | +91 9213414228</p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'product.saralnaturals@gmail.com',
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'investor' | 'admin';
  investments?: Investment[];
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface Investment {
  _id?: string;
  userId: string;
  amount: number;
  profitShare: number; // percentage
  investmentDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  monthlyReturns: MonthlyReturn[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlyReturn {
  month: string; // YYYY-MM format
  amount: number;
  companyRevenue: number;
  paidAt?: Date;
  status: 'pending' | 'paid';
}

export interface OTPVerification {
  _id?: string;
  email: string;
  otp: string;
  type: 'password_reset' | 'email_verification';
  expiresAt: Date;
  createdAt: Date;
  verified: boolean;
}
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const EmailSchema = z.object({
  email: z.string().email(),
});

const OTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof EmailSchema>;
type OTPFormValues = z.infer<typeof OTPSchema>;

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { email },
  });

  const onEmailSubmit = async (values: EmailFormValues) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();
      if (data.success) {
        setEmail(values.email);
        setStep('otp');
        otpForm.setValue('email', values.email);
      } else {
        emailForm.setError('root', { message: data.error || 'Failed to send OTP' });
      }
    } catch (error) {
      emailForm.setError('root', { message: 'Network error' });
    }
  };

  const onOTPSubmit = async (values: OTPFormValues) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          otp: values.otp,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Password reset successful! You can now login with your new password.');
        window.location.href = '/login';
      } else {
        otpForm.setError('root', { message: data.error || 'Failed to reset password' });
      }
    } catch (error) {
      otpForm.setError('root', { message: 'Network error' });
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-neutral-100">
            {step === 'email' ? 'Forgot Password' : 'Reset Password'}
          </h1>
          <p className="mt-2 text-amber-700 dark:text-neutral-400">
            {step === 'email' 
              ? 'Enter your email to receive a password reset OTP'
              : 'Enter the OTP sent to your email and your new password'
            }
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-8 border border-amber-200 dark:border-neutral-700">
          {step === 'email' ? (
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  {t('contact.email')}
                </label>
                <input
                  {...emailForm.register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{emailForm.formState.errors.email.message}</p>
                )}
              </div>

              {emailForm.formState.errors.root && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-700 dark:text-red-300 text-sm">{emailForm.formState.errors.root.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={emailForm.formState.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {emailForm.formState.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  Email
                </label>
                <input
                  {...otpForm.register('email')}
                  type="email"
                  disabled
                  className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-amber-100 dark:bg-neutral-700 text-amber-900 dark:text-neutral-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  OTP (6 digits)
                </label>
                <input
                  {...otpForm.register('otp')}
                  type="text"
                  maxLength={6}
                  className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="000000"
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{otpForm.formState.errors.otp.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    {...otpForm.register('newPassword')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 dark:text-neutral-400 hover:text-amber-800 dark:hover:text-neutral-200"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {otpForm.formState.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{otpForm.formState.errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    {...otpForm.register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 dark:text-neutral-400 hover:text-amber-800 dark:hover:text-neutral-200"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {otpForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{otpForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              {otpForm.formState.errors.root && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-700 dark:text-red-300 text-sm">{otpForm.formState.errors.root.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={otpForm.formState.isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {otpForm.formState.isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full flex items-center justify-center gap-2 text-amber-600 dark:text-neutral-400 hover:text-amber-800 dark:hover:text-neutral-200 font-medium py-2"
              >
                <ArrowLeft size={16} />
                Back to Email
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/lib/i18n';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [sent, setSent] = React.useState(false);

  async function onSubmit(data: { email: string }) {
    // Call backend to send OTP via nodemailer
    // For now we simulate
    console.log('Request reset for', data.email);
    setSent(true);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">Forgot Password</h1>
      {!sent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
          <input {...register('email')} placeholder="Email" className="rounded-md border px-3 py-2" />
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">Send OTP</button>
        </form>
      ) : (
        <div className="mt-4">An OTP has been sent if the email exists. Use it to <a href="/change-password" className="text-green-700">change password</a>.</div>
      )}
    </main>
  );
}

"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/lib/i18n';

export default function ChangePassword() {
  const { t } = useLanguage();
  const { register, handleSubmit } = useForm<{ otp: string; password: string }>();
  const [done, setDone] = React.useState(false);

  async function onSubmit(data: { otp: string; password: string }) {
    // Verify OTP with backend and change password
    console.log('Change password', data);
    setDone(true);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">Change Password</h1>
      {!done ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
          <input {...register('otp')} placeholder="OTP" className="rounded-md border px-3 py-2" />
          <input {...register('password')} placeholder="New Password" className="rounded-md border px-3 py-2" />
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">Change Password</button>
        </form>
      ) : (
        <div className="mt-4">Password changed. Please <a href="/login" className="text-green-700">login</a>.</div>
      )}
    </main>
  );
}

"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const { register, handleSubmit } = useForm<{ otp: string; password: string; email?: string }>();
  const [done, setDone] = React.useState(false);
  const router = useRouter();

  async function onSubmit(data: { otp: string; password: string; email?: string }) {
    try {
      const payload = { email: data.email, otp: data.otp, password: data.password };
      const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed');
      setDone(true);
      // redirect to login after 5s so user can re-login
      setTimeout(() => router.push('/login'), 5000);
    } catch {
      alert('Unable to change password');
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">Change Password</h1>
      {!done ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
          <input {...register('email')} placeholder="Email" className="rounded-md border px-3 py-2" />
          <input {...register('otp')} placeholder="OTP" className="rounded-md border px-3 py-2" />
          <input {...register('password')} placeholder="New Password" className="rounded-md border px-3 py-2" />
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">Change Password</button>
        </form>
      ) : (
        <div className="mt-4">Password changed. You will be redirected to login shortly.</div>
      )}
    </main>
  );
}

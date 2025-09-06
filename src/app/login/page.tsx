"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/context/AuthContext';

type Form = { email: string; password: string };

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>();
  const { login } = useAuth();

  async function onSubmit(data: Form) {
    try {
      const u = await login(data.email, data.password);
      if (!u) throw new Error('Login failed');
  try { router.refresh(); } catch {}
      if (u.role === 'admin') router.push('/admin'); else router.push('/investments');
    } catch (err) {
      alert(String(err));
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">{t('cta.getStarted')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-3">
        <input {...register('email')} placeholder={t('contact.email')} className="rounded-md border px-3 py-2" />
        <input type="password" {...register('password')} placeholder="Password" className="rounded-md border px-3 py-2" />
        <div className="flex items-center justify-between">
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">Login</button>
          <a href="/forgot-password" className="text-sm text-green-700">Forgot?</a>
        </div>
      </form>
    </main>
  );
}

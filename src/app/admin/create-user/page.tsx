"use client";
/* eslint-disable */

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
// server will hash passwords; no client-side bcrypt

export default function CreateUser() {
  const { t, language } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string; role?: string; name?: string; phone?: string; investedAmount?: number; returnPct?: number }>({ defaultValues: { role: 'investor' } });
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  async function onSubmit(data: any) {
    try {
      const payload = { ...data } as any;
      // avatar may be in avatarPreview state (base64 data URL)
      if (avatarPreview) payload.avatar = avatarPreview;
      // include CSRF token from cookie
      const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
  const res = await fetch('/api/admin/users', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, credentials: 'include' });
  const d = await res.json();
  if (!res.ok) throw new Error(t('admin.userCreateError'));
  if (d.user) {
    // success, avatar stored in DB
    alert(t('admin.userCreated'));
    router.push('/admin');
  } else {
    throw new Error(t('admin.userCreateError'));
  }
    } catch (e) { alert(String(e)); }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) { setAvatarPreview(null); return; }
    (async () => {
      const data = await resizeImageToDataUrl(f, 800, 0.8);
      setAvatarPreview(data);
    })();
  }

  async function resizeImageToDataUrl(file: File, maxDim = 800, quality = 0.8) {
    return new Promise<string>((resolve, reject) => {
      const img = document.createElement('img') as HTMLImageElement;
      const reader = new FileReader();
      reader.onload = () => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas not supported'));
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = String(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
  <h1 className="text-2xl font-semibold">{t('admin.createUser')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
        <label className="flex flex-col">
          <span className="text-sm">Profile picture (optional)</span>
          <input type="file" accept="image/*" onChange={onFileChange} className="mt-1" />
          {avatarPreview && <Image src={avatarPreview} alt="avatar preview" width={64} height={64} className="rounded-full mt-2 object-cover" unoptimized />}
        </label>
  <input {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })} placeholder={t('contact.email')} className="rounded-md border px-3 py-2" />
  {errors.email && <div className="text-red-600 text-sm">{t('contact.email') || 'Email is required'}</div>}
  <input {...register('password')} placeholder={t('contact.password') || 'Password'} className="rounded-md border px-3 py-2" />
  <input {...register('name', { required: true })} placeholder={t('contact.name') || 'Full name'} className="rounded-md border px-3 py-2" />
  {errors.name && <div className="text-red-600 text-sm">{t('contact.name') || 'Name is required'}</div>}
  <input {...register('phone')} placeholder={t('contact.phone')} className="rounded-md border px-3 py-2" />
  <input type="number" step="0.01" {...register('investedAmount')} placeholder={language === 'hi' ? 'निवेश राशि' : 'Invested Amount'} className="rounded-md border px-3 py-2" />
  <input type="number" step="0.01" {...register('returnPct')} placeholder={language === 'hi' ? 'रिटर्न %' : 'Return %'} className="rounded-md border px-3 py-2" />
        <select {...register('role')} className="rounded-md border px-3 py-2">
          <option value="investor">{t('role.investor') || 'Investor'}</option>
          <option value="admin">{t('role.admin') || 'Admin'}</option>
        </select>
        <button className="rounded-md bg-green-600 px-4 py-2 text-white">{language === 'hi' ? 'बनाएं' : 'Create'}</button>
      </form>
    </main>
  );
}

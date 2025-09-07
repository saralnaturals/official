"use client";

import React from 'react';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { t } = useLanguage();
  const { user, refresh } = useAuth();
  const [preview, setPreview] = React.useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  type SimpleUser = { email: string; name?: string; phone?: string; avatar?: string; invested?: boolean } | null;

  React.useEffect(() => {
    if (user) {
      const u = user as SimpleUser;
      setName(u?.name ?? '');
      setPhone(u?.phone ?? '');
    }
  }, [user]);

  if (!user) return <main className="mx-auto max-w-md px-4 py-12">Please login to view account.</main>;

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    // resize & compress before upload to avoid very large payloads
    const data = await resizeImageToDataUrl(f, 800, 0.8);
    setPreview(data);
    try {
      const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
      const res = await fetch('/api/users/me', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, body: JSON.stringify({ avatar: data }), credentials: 'include' });
      const d = await res.json();
      if (res.ok && d.user) {
        setPreview(d.user.avatar ?? data);
        await refresh();
      }
    } catch {
      /* ignore */
    }
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

  async function saveProfile() {
    try {
      const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
  const payload: { name?: string; phone?: string } = { name, phone };
      const res = await fetch('/api/users/me', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, body: JSON.stringify(payload), credentials: 'include' });
      const d = await res.json();
      if (res.ok && d.user) {
        await refresh();
        setPreview(d.user.avatar ?? null);
      }
      alert('Profile updated');
    } catch (e) { alert(String(e)); }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">{t('site.name')} - Account</h1>
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-4">
          {preview || user.avatar ? (
            // keep larger preview using Image for data URL or remote src
            <Image src={preview || user.avatar!} alt={user.name ?? 'avatar'} width={72} height={72} className="rounded-full object-cover" unoptimized />
          ) : (
            <Avatar size="lg" />
          )}
          <div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Invested:</strong> {user.invested ? 'Yes' : 'No'}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm">Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-md border px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-md border px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm">Profile picture</label>
          <input type="file" accept="image/*" onChange={onFileChange} className="mt-1" />
        </div>
        <div className="flex gap-2">
          <button onClick={saveProfile} className="rounded-md bg-green-600 px-4 py-2 text-white">Save</button>
          <a href="/change-password" className="text-green-700 self-center">Change Password</a>
        </div>
      </div>
    </main>
  );
}

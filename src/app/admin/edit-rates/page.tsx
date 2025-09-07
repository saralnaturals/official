"use client";
/* eslint-disable */

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';

export default function EditRates() {
  const { language } = useLanguage();
  const { register, handleSubmit, setValue } = useForm<{ email?: string; investedAmount?: number; returnPct?: number }>();
  const router = useRouter();
  const [users, setUsers] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  // debounced server-side search
  React.useEffect(() => {
    if (!query) return setSuggestions([]);
    const controller = new AbortController();
    const id = setTimeout(() => {
      fetch(`/api/admin/users/search?q=${encodeURIComponent(query)}`, { credentials: 'include', signal: controller.signal })
        .then(r => r.json())
        .then(d => {
          if (d.users) {
            setSuggestions(d.users.slice(0, 10));
            // for preview, keep a local cache of recent server results
            setUsers(prev => {
              const merged = [...d.users, ...prev];
              // dedupe by _id
              const map = new Map();
              for (const u of merged) if (u && u._id) map.set(String(u._id), u);
              return Array.from(map.values()).slice(0, 50);
            });
          }
        }).catch(() => {});
    }, 300);
    return () => { clearTimeout(id); controller.abort(); };
  }, [query]);

  React.useEffect(() => {
    if (!query) return setSuggestions([]);
    const q = query.toLowerCase();
    setSuggestions(users.filter(u => (u.name || u.email || '').toLowerCase().includes(q)).slice(0, 10));
  }, [query, users]);

  const { t } = useLanguage();

  async function onSubmit(data: any) {
    try {
      if (!data.email) return alert(t('admin.selectUser'));
  const payload: any = { email: data.email, investedAmount: Number(data.investedAmount || 0), returnPct: Number(data.returnPct || 0) };
  if (selectedUser?._id) {
    // admin updating a specific user
    if (avatarPreview) payload.avatar = avatarPreview;
    payload.name = selectedUser.name;
    payload.phone = selectedUser.phone;
    payload.role = selectedUser.role;
    const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
    const res = await fetch(`/api/admin/users/${selectedUser._id}`, { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, credentials: 'include' });
    if (!res.ok) throw new Error(t('admin.userUpdateError') || 'Update failed');
  } else {
    const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
    const res = await fetch('/api/users/me', { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, credentials: 'include' });
    if (!res.ok) throw new Error(t('admin.userUpdateError') || 'Update failed');
  }
  alert(t('admin.userUpdated'));
      router.push('/admin');
    } catch (e) { alert(String(e)); }
  }

  function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function calcEarned(inv: number, pct: number) {
    return ((inv * pct) / 100).toFixed(2);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
  <h1 className="text-2xl font-semibold">{t('admin.editRates')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
        <div>
          <label className="text-sm font-medium">{t('admin.users')}</label>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t('admin.selectUserPlaceholder')} className="w-full rounded-md border px-3 py-2 mt-1" />
          {suggestions.length > 0 && (
            <ul className="border rounded mt-1 max-h-48 overflow-auto bg-white dark:bg-neutral-900">
              {suggestions.map(u => (
                <li key={u._id} className="px-3 py-2 hover:bg-amber-50 cursor-pointer" onClick={() => {
                  setSelectedUser(u);
                  setValue('email', u.email);
                  setValue('investedAmount', Number(u.investedAmount || 0));
                  setValue('returnPct', Number(u.returnPct || 0));
                  setQuery(u.name ?? u.email);
                  setSuggestions([]);
                }}>{u.name ?? u.email}</li>
              ))}
            </ul>
          )}
        </div>
        <input type="number" step="0.01" {...register('investedAmount')} placeholder={language === 'hi' ? 'निवेश राशि' : 'Invested Amount'} className="rounded-md border px-3 py-2" />
        <input type="number" step="0.01" {...register('returnPct')} placeholder={language === 'hi' ? 'रिटर्न %' : 'Return %'} className="rounded-md border px-3 py-2" />
  <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-white">{language === 'hi' ? 'सहेजें' : 'Save'}</button>
      </form>

      <div className="mt-6">
        <h2 className="font-semibold">{t('admin.users')}</h2>
        {selectedUser ? (
          <div className="mt-2 border p-2 rounded">
            <div className="flex items-center gap-3">
              {selectedUser.avatar ? <Image src={selectedUser.avatar} alt={selectedUser.name ?? 'avatar'} width={48} height={48} className="rounded-full object-cover" unoptimized /> : <div className="h-12 w-12 rounded-full bg-amber-700 text-white flex items-center justify-center">{(selectedUser.name?.[0] || 'A')}</div>}
              <div>
                <div><strong>{selectedUser.name ?? selectedUser.email}</strong></div>
                <div className="text-sm">{selectedUser.email}</div>
              </div>
            </div>
            <div className="mt-2">
              <label className="text-sm block">Change profile picture</label>
              <input type="file" accept="image/*" onChange={onAvatarChange} className="mt-1" />
              {avatarPreview && <Image src={avatarPreview} alt="preview" width={64} height={64} className="rounded-full object-cover mt-2" unoptimized />}
            </div>
            <div className="mt-2">{t('label.investedAmount')}: ₹{selectedUser.investedAmount ?? 0}</div>
            <div>{t('label.returnPct')}: {selectedUser.returnPct ?? 0}</div>
            <div>{t('label.estimatedMonthly')}: ₹{calcEarned(Number(selectedUser.investedAmount || 0), Number(selectedUser.returnPct || 0))}</div>
          </div>
        ) : (
          users.map(u => (
            <div key={u._id} className="mt-2 border p-2 rounded">
              <div><strong>{u.name ?? u.email}</strong></div>
              <div>{t('label.investedAmount')}: ₹{u.investedAmount ?? 0}</div>
              <div>{t('label.returnPct')}: {u.returnPct ?? 0}</div>
              <div>{t('label.estimatedMonthly')}: ₹{calcEarned(Number(u.investedAmount || 0), Number(u.returnPct || 0))}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

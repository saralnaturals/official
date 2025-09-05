"use client";
/* eslint-disable */

import React from 'react';
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
  const payload = { email: data.email, investedAmount: Number(data.investedAmount || 0), returnPct: Number(data.returnPct || 0) };
  const csrf = document.cookie.split('sn_csrf=')[1]?.split(';')[0];
  const res = await fetch('/api/users/me', { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf || '' }, credentials: 'include' });
  if (!res.ok) throw new Error(t('admin.userUpdateError') || 'Update failed');
  alert(t('admin.userUpdated'));
      router.push('/admin');
    } catch (e) { alert(String(e)); }
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
            <div><strong>{selectedUser.name ?? selectedUser.email}</strong></div>
            <div>{t('label.investedAmount')}: ₹{selectedUser.investedAmount ?? 0}</div>
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

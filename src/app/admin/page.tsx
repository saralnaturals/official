"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user || user.role !== 'admin') {
    return <main className="mx-auto max-w-md px-4 py-12">{t('admin.accessDenied')}</main>;
  }

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
  <h1 className="text-2xl font-semibold">{t('admin.dashboardTitle')}</h1>
  <p className="mt-2">{t('admin.dashboardDesc')}</p>
      <div className="mt-6 flex flex-wrap gap-3">
  <Link href="/admin/create-user" className="rounded-md bg-red-600 px-3 py-2 text-white">{t('admin.createUser')}</Link>
  <Link href="/admin/edit-rates" className="rounded-md bg-yellow-600 px-3 py-2 text-white">{t('admin.editRates')}</Link>
  <button onClick={handleLogout} className="rounded-md bg-gray-600 px-3 py-2 text-white">{t('admin.logout')}</button>
      </div>
    </main>
  );
}

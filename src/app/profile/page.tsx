"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) return <main className="mx-auto max-w-md px-4 py-12">Please login to view account.</main>;

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold">{t('site.name')} - Account</h1>
      <div className="mt-4 space-y-2">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Name:</strong> {user.name ?? '-'}</div>
        <div><strong>Invested:</strong> {user.invested ? 'Yes' : 'No'}</div>
        <div className="mt-4">
          <a href="/change-password" className="text-green-700">Change Password</a>
        </div>
      </div>
    </main>
  );
}

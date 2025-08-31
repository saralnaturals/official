"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';

export default function InvestmentHero() {
  const { t } = useLanguage();

  return (
    <header className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-orange-600">
        {t('investment.hero.title')}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-amber-700 dark:text-neutral-400">
        {t('investment.hero.subtitle')}
      </p>
      <div className="mt-4 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full inline-block px-4 py-1">
        {t('investment.hero.deadline')}
      </div>
    </header>
  );
}

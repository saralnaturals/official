"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';

export default function InvestmentFooter() {
  const { t } = useLanguage();

  return (
    <footer className="text-center py-8 border-t border-amber-200 dark:border-neutral-700">
      <p className="font-bold text-xl text-orange-600">
        {t('investment.hero.title')}
      </p>
      <p className="text-amber-700 dark:text-neutral-400 text-sm mt-2">
        {t('investment.footer.tagline')}
      </p>
    </footer>
  );
}

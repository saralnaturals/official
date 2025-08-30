"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';

export default function InvestmentFooter() {
  const { t } = useLanguage();

  return (
    <footer className="text-center py-8 border-t border-stone-200">
      <p className="font-bold text-xl text-orange-600">
        {t('investment.hero.title')}
      </p>
      <p className="text-stone-500 text-sm mt-2">
        {t('investment.footer.tagline')}
      </p>
    </footer>
  );
}

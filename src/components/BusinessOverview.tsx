"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';

export default function BusinessOverview() {
  const { t } = useLanguage();

  return (
    <section className="mb-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('investment.business.title')}</h2>
        <p className="text-amber-700 dark:text-neutral-400">
          {t('investment.business.subtitle')}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-amber-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-neutral-700">
          <h3 className="text-xl font-semibold mb-2 text-orange-600">
            {t('investment.business.dairy.title')}
          </h3>
          <p className="text-amber-700 dark:text-neutral-400">
            {t('investment.business.dairy.desc')}
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-neutral-700">
          <h3 className="text-xl font-semibold mb-2 text-orange-600">
            {t('investment.business.alternatives.title')}
          </h3>
          <p className="text-amber-700 dark:text-neutral-400">
            {t('investment.business.alternatives.desc')}
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-neutral-700">
          <h3 className="text-xl font-semibold mb-2 text-orange-600">
            {t('investment.business.future.title')}
          </h3>
          <p className="text-amber-700 dark:text-neutral-400">
            {t('investment.business.future.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

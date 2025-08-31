"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

interface TermData {
  key: string;
  title: string;
  content: string;
}

export default function TermsAccordion() {
  const { t } = useLanguage();
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const termsData: TermData[] = [
    {
      key: 'disclaimers',
      title: t('investment.terms.disclaimers.title'),
      content: t('investment.terms.disclaimers.content')
    },
    {
      key: 'refund',
      title: t('investment.terms.refund.title'),
      content: t('investment.terms.refund.content')
    },
    {
      key: 'warranties',
      title: t('investment.terms.warranties.title'),
      content: t('investment.terms.warranties.content')
    },
    {
      key: 'company',
      title: t('investment.terms.company.title'),
      content: t('investment.terms.company.content')
    },
    {
      key: 'confidentiality',
      title: t('investment.terms.confidentiality.title'),
      content: t('investment.terms.confidentiality.content')
    },
    {
      key: 'termination',
      title: t('investment.terms.termination.title'),
      content: t('investment.terms.termination.content')
    },
    {
      key: 'governing',
      title: t('investment.terms.governing.title'),
      content: t('investment.terms.governing.content')
    },
    {
      key: 'general',
      title: t('investment.terms.general.title'),
      content: t('investment.terms.general.content')
    }
  ];

  const toggleTerm = (key: string) => {
    setActiveTerm(activeTerm === key ? null : key);
  };

  return (
    <section className="mb-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('investment.terms.title')}</h2>
        <p className="text-amber-700 dark:text-neutral-400">
          {t('investment.terms.subtitle')}
        </p>
      </div>
      <div className="space-y-4 max-w-4xl mx-auto">
        {termsData.map((term) => (
          <div key={term.key} className="border border-amber-200 dark:border-neutral-700 rounded-lg bg-amber-50 dark:bg-neutral-800">
            <button
              onClick={() => toggleTerm(term.key)}
              className="w-full text-left p-4 font-semibold flex justify-between items-center hover:bg-amber-100 dark:hover:bg-neutral-700 transition-colors duration-200"
            >
              <span>{term.title}</span>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  activeTerm === term.key ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-out ${
                activeTerm === term.key ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <p className="p-4 pt-0 text-amber-700 dark:text-neutral-400 text-sm">{term.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

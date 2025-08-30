"use client";

import React from "react";
import { useParams } from "next/navigation";
import { investmentSchemes } from "@/data/investments";
import { useLanguage } from "@/lib/i18n";
import content from "@/data/investment-content.json";
type InvestmentContentMap = Record<"en" | "hi", string>;

export default function InvestmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const scheme = investmentSchemes.find((s) => s.slug === params.slug);

  if (!scheme) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">The scheme you are looking for does not exist.</p>
      </main>
    );
  }

  const title = scheme.title[language];
  const summary = scheme.summary[language];
  const highlights = scheme.highlights[language];

  const longText = (content as InvestmentContentMap)[language];

  return (
    <main className="prose dark:prose-invert mx-auto max-w-4xl px-4 py-12">
      <h1>{title}</h1>
      <p>{summary}</p>
      <h2>Highlights</h2>
      <ul>
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <h2>Details</h2>
      <pre className="whitespace-pre-wrap text-sm leading-6">{longText}</pre>
    </main>
  );
}



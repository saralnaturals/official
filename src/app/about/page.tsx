"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { siteContent } from "@/data/site-content";

export default function AboutPage() {
  const { language } = useLanguage();
  const sc = siteContent[language];
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-semibold">{sc.about.heading}</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">{sc.about.body}</p>
    </main>
  );
}



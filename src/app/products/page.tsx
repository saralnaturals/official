"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { siteContent } from "@/data/site-content";
import Image from "next/image";

export default function ProductsPage() {
  const { language } = useLanguage();
  const sc = siteContent[language];
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-semibold">{sc.products.heading}</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {sc.products.entries.map((p) => (
          <div key={p.title} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <h2 className="text-base font-medium">{p.title}</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}



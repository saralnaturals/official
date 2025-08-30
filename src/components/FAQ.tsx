"use client";

import React, { useState } from "react";

type QA = { q: string; a: string };

export default function FAQ({ heading, items }: { heading: string; items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-10">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="mt-4 divide-y divide-neutral-200 rounded-md border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {items.map((qa, idx) => (
          <div key={qa.q}>
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900"
              aria-expanded={open === idx}
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="font-medium">{qa.q}</span>
              <span className="text-xl">{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && <div className="px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-300">{qa.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}



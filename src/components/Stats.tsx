"use client";

import React from "react";

type Stat = { label: string; value: string };

export default function Stats({ heading, items }: { heading: string; items: Stat[] }) {
  return (
    <section className="py-10">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((s) => (
          <div key={s.label} className="rounded-lg border border-neutral-200 p-5 text-center dark:border-neutral-800">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}



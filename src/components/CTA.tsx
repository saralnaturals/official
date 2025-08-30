"use client";

import Link from "next/link";

export default function CTA({ heading, subheading, primaryText, primaryHref }: {
  heading: string;
  subheading: string;
  primaryText: string;
  primaryHref: string;
}) {
  return (
    <section className="my-12 rounded-xl border border-neutral-200 p-6 text-center dark:border-neutral-800">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{subheading}</p>
      <div className="mt-4">
        <Link href={primaryHref} className="rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700">
          {primaryText}
        </Link>
      </div>
    </section>
  );
}



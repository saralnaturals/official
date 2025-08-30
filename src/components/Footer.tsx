"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/lib/i18n";
import Schema from "@/components/Schema";
import { siteContent } from "@/data/site-content";

export default function Footer() {
  const { t, language } = useLanguage();
  const sc = siteContent[language];
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {t("site.name")}. {t("footer.rights")}</p>
          <p className="mt-1">{sc.contact.phone} · {sc.contact.email}</p>
          <p className="mt-1">{sc.contact.address}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <Schema
        json={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: t("site.name"),
          url: sc.contact.website,
          email: sc.contact.email,
          telephone: sc.contact.phone,
          address: sc.contact.address,
        }}
      />
    </footer>
  );
}



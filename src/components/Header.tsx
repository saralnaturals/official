"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { brandAssets } from "@/lib/brand";

export default function Header() {
  const { t, setLanguage, language } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/80 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 max-sm:flex-wrap">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
            <Image src={brandAssets.mark} alt="Saral Naturals" width={108} height={28} style={{ filter: 'drop-shadow(1px 1px 0px white) drop-shadow(-1px -1px 0px white)' }} />
          <span>{t("site.name")}</span>
        </Link>
        <nav className=" items-center gap-6 flex min-w-[280px] max-sm:w-full max-sm:order-1 max-sm:justify-between max-sm:pt-2 max-sm:mt-2 max-sm:border-t">
          <Link href="/" className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {t("nav.home")}
          </Link>
          <Link href="/about" className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {t("nav.about")}
          </Link>
          <Link href="/products" className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {t("nav.products")}
          </Link>
          <Link href="/investments" className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {t("nav.investments")}
          </Link>
          <Link href="/contact" className="text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {t("nav.contact")}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle Theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <Globe size={18} />
              <span className="text-xs uppercase">{language}</span>
            </button>
            {open && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 min-w-[140px] overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                <li>
                  <button
                    role="option"
                    aria-selected={language === "en"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => {
                      setLanguage("en");
                      setOpen(false);
                    }}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    role="option"
                    aria-selected={language === "hi"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => {
                      setLanguage("hi");
                      setOpen(false);
                    }}
                  >
                    हिन्दी
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}



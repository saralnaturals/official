"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from "@/lib/i18n";
import { Globe } from "lucide-react";
import Image from "next/image";
import { brandAssets } from "@/lib/brand";

export default function Header() {
  const { t, setLanguage, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();

  function maskEmail(email: string) {
    try {
      const [local, domain] = email.split('@');
      if (!local || !domain) return email;
      if (local.length <= 2) return `${local[0]}*@${domain}`;
      return `${local[0]}***${local.slice(-1)}@${domain}`;
    } catch (e) { return email; }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-300 bg-amber-50/20 backdrop-blur-md supports-[backdrop-filter]:bg-amber-50/20 shadow-lg dark:border-neutral-700 dark:bg-neutral-900/95 dark:supports-[backdrop-filter]:bg-neutral-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 max-sm:flex-wrap">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <Image src={brandAssets.mark} alt="Saral Naturals" width={108} height={28} style={{ filter: 'drop-shadow(1px 1px 0px #f5f5dc) drop-shadow(-1px -1px 0px #f5f5dc)' }} />
          <span>{t("site.name")}</span>
        </Link>

  <nav className="hidden sm:flex items-center gap-6 min-w-[280px] md:min-w-[320px]">
          <Link href="/" className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium">
            {t("nav.home")}
          </Link>
          <Link href="/about" className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium">
            {t("nav.about")}
          </Link>
          <Link href="/products" className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium">
            {t("nav.products")}
          </Link>
          <Link href="/investments" className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium">
            {t("nav.investments")}
          </Link>
          <Link href="/contact" className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium">
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Profile / Login */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {user ? (
                <>
                  <div className="h-6 w-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs">{user.name ? user.name[0] : 'U'}</div>
                  <span className="text-sm font-medium">{user.name ?? (user.email ? maskEmail(user.email) : '')}</span>
                </>
              ) : (
                <span className="text-sm font-medium">{t('cta.getStarted')}</span>
              )}
            </button>

            {profileOpen && (
              <ul className="absolute right-0 mt-2 min-w-[200px] overflow-hidden rounded-md border border-amber-300 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50">
                {user ? (
                  <>
                    <li>
                      <Link href="/account" className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800">Profile</Link>
                    </li>
                    <li>
                      <button
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800"
                          onClick={async () => { await logout(); setProfileOpen(false); }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/login" className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800">Login / Register</Link>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <Globe size={18} />
              <span className="text-xs uppercase font-medium">{language}</span>
            </button>

            {open && (
              <ul className="absolute right-0 mt-2 min-w-[140px] overflow-hidden rounded-md border border-amber-300 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                <li>
                  <button
                    role="option"
                    aria-selected={language === "en"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
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
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
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

          {/* Hamburger for mobile / slider */}
          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="ml-2 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors sm:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {drawerOpen && (
            <div className="fixed inset-0 z-50 flex sm:hidden">
              <div className="w-full max-w-xs bg-amber-50 dark:bg-neutral-900 border-l border-amber-200 dark:border-neutral-700 shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src={brandAssets.mark} alt="Saral" width={86} height={24} />
                    <span className="font-semibold">{t('site.name')}</span>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-md hover:bg-amber-200 dark:hover:bg-neutral-800">
                    Close
                  </button>
                </div>
                <nav className="mt-6 flex flex-col gap-3">
                  <Link href="/" className="text-sm">{t('nav.home')}</Link>
                  <Link href="/about" className="text-sm">{t('nav.about')}</Link>
                  <Link href="/products" className="text-sm">{t('nav.products')}</Link>
                  <Link href="/investments" className="text-sm">{t('nav.investments')}</Link>
                  <Link href="/contact" className="text-sm">{t('nav.contact')}</Link>
                </nav>
                <div className="mt-6 border-t border-amber-200 pt-4">
                  {user ? (
                    <>
                      <Link href="/account" className="block mb-2">Profile</Link>
                      <button
                        className="block text-left"
                        onClick={async () => { await logout(); setDrawerOpen(false); }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/login" className="block">Login / Register</Link>
                  )}
                </div>
              </div>
              <div className="flex-1" onClick={() => setDrawerOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



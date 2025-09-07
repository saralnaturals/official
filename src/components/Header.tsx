"use client";

import Link from "next/link";
import React, { use, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from "@/lib/i18n";
import { Globe } from "lucide-react";
import Image from "next/image";
import { brandAssets } from "@/lib/brand";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { t, setLanguage, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = usePathname();
  const navigate = useRouter();

  const navItems = [
    { href: "/", labelKey: "nav.home", isProtected: false },
    { href: "/about", labelKey: "nav.about", isProtected: false },
    { href: "/products", labelKey: "nav.products", isProtected: false },
    { href: "/investments", labelKey: "nav.investments", isProtected: false },
    { href: "/contact", labelKey: "nav.contact", isProtected: false },
    { href: "/profile", labelKey: "nav.profile", isProtected: true },
  ];

  function maskEmail(email: string) {
    try {
      const [local, domain] = email.split('@');
      if (!local || !domain) return email;
      if (local.length <= 2) return `${local[0]}*@${domain}`;
      return `${local[0]}***${local.slice(-1)}@${domain}`;
    } catch { return email; }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-600 bg-amber-50/20 backdrop-blur-md supports-[backdrop-filter]:bg-amber-50/20 shadow-lg dark:border-neutral-700 dark:bg-neutral-900/95 dark:supports-[backdrop-filter]:bg-neutral-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 max-[800px]:flex-wrap">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <Image
            src={brandAssets.mark}
            alt="Saral Naturals"
            width={108}
            height={28}
            className="max-[400px]:w-20"
            style={{ filter: 'drop-shadow(1px 1px 0px #f5f5dc) drop-shadow(-1px -1px 0px #f5f5dc)' }}
          />
          <span className="max-[400px]:text-sm text-base">{t("site.name")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-[812px]:flex items-center gap-6 min-w-[280px] md:min-w-[320px]">
          {navItems
            .filter(item => !item.isProtected)
            .map((item) => <Link key={item.labelKey} href={item.href} className={`text-sm  transition-all text-amber-900 border-b-4 ${location === item.href ? " border-amber-600" : "border-transparent"} hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium`}>{t(item.labelKey)}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          {/* Profile / Login */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="min-[812px]:flex hidden items-center gap-2 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs">{user.name ? user.name[0] : 'A'}</div>
                <span className="text-sm font-medium w-18 text-ellipsis text-left">Hi, {user.name?.split(" ")[0] ?? ''}</span>
              </button>
            ) : (
              <Link href="/login" className="min-[812px]:flex hidden ">Login</Link>
            )}

            {profileOpen && (
              <ul className="absolute right-0 mt-2 min-w-[200px] overflow-hidden rounded-md border border-amber-600 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50">
                {user ? (
                  <>
                    <li><Link href="/profile" className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800">Profile</Link></li>
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
                  <li><Link href="/login" className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800">Login</Link></li>
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
              <ul className="absolute right-0 mt-2 min-w-[140px] overflow-hidden rounded-md border border-amber-600 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                <li>
                  <button
                    role="option"
                    aria-selected={language === "en"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                    onClick={() => { setLanguage("en"); setOpen(false); }}
                  >English</button>
                </li>
                <li>
                  <button
                    role="option"
                    aria-selected={language === "hi"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                    onClick={() => { setLanguage("hi"); setOpen(false); }}
                  >हिन्दी</button>
                </li>
              </ul>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="ml-2 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors min-[812px]:hidden z-50"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={drawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {drawerOpen && (
          <div className="fixed h-screen flex-col inset-0 z-50 flex min-[812px]:hidden bg-amber-50 dark:bg-neutral-900 ">
            <div className="w-full z-10 border-b border-amber-600 bg-amber-50 dark:bg-neutral-900  dark:border-neutral-700 shadow-lg py-3">
              <div className="flex items-center justify-between px-4 ">
                <Link href="/" className="flex items-center gap-2 text-base font-semibold">
                  <Image
                    src={brandAssets.mark}
                    alt="Saral Naturals"
                    width={108}
                    height={28}
                    className="max-[400px]:w-20"
                    style={{ filter: 'drop-shadow(1px 1px 0px #f5f5dc) drop-shadow(-1px -1px 0px #f5f5dc)' }}
                  />
                  <span className="max-[400px]:text-sm text-base ">{t("site.name")}</span>
                </Link>
                <button onClick={() => setDrawerOpen(false)} className="p-2 flex items-center rounded-md hover:bg-amber-200 dark:hover:bg-neutral-800">
                  <div className="flex-1" aria-label="Toggle menu" onClick={() => setDrawerOpen(false)} >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={drawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                  </div>
                  Close
                </button>
              </div>
            </div>
            {user ? <div className="flex pt-5 justify-center items-center text-xl">👋Hi, {user.name ?? ''}</div> : null}
            <div className={`flex flex-col justify-start grow w-full pt-1 bg-amber-50 dark:bg-neutral-900  dark:border-neutral-700 ${user ? '' : 'mt-4'}`}>
              <nav className="flex flex-col">
                {navItems
                  .filter(item => !item.isProtected || (item.isProtected && user))
                  .map((item) => <button key={item.labelKey} onClick={() => { navigate.push(item.href); setDrawerOpen(false); }} className={`text-base text-left py-1 ${location === item.href ? "border-l-4 border-amber-600 border-b pr-4 pl-3" : " border-b border-transparent px-4"} hover:bg-amber-200 dark:hover:bg-neutral-800 transition-all`}>{t(item.labelKey)}</button>)}
              </nav>
              {user ? (
                <button className="text-base py-2 mx-4 mb-4 mt-12 rounded-xl border border-amber-600 transition-all hover:bg-amber-600 hover:text-amber-50 dark:hover:bg-neutral-800" onClick={async () => { await logout(); setDrawerOpen(false); }}>Logout</button>
              ) : <button className="text-base py-2 mx-4 mb-4 mt-12 rounded-xl border border-amber-600 transition-all hover:bg-amber-600 hover:text-amber-50 dark:hover:bg-neutral-800" onClick={() => { navigate.push("/login"); setDrawerOpen(false); }}>Login</button>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}



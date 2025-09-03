"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Globe, User, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { brandAssets } from "@/lib/brand";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { t, setLanguage, language } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, logout, loading } = useAuth();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
    { href: "/investments", label: t("nav.investments") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-300 bg-amber-50/20 backdrop-blur-md supports-[backdrop-filter]:bg-amber-50/20 shadow-lg dark:border-neutral-700 dark:bg-neutral-900/95 dark:supports-[backdrop-filter]:bg-neutral-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <Image 
            src={brandAssets.mark} 
            alt="Saral Naturals" 
            width={108} 
            height={28} 
            style={{ filter: 'drop-shadow(1px 1px 0px #f5f5dc) drop-shadow(-1px -1px 0px #f5f5dc)' }} 
          />
          <span className="hidden sm:block">{t("site.name")}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-amber-900 hover:text-amber-950 dark:text-neutral-300 dark:hover:text-white font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
            >
              <Globe size={18} />
              <span className="text-xs uppercase font-medium">{language}</span>
            </button>
            {languageOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 min-w-[140px] overflow-hidden rounded-md border border-amber-300 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50"
              >
                <li>
                  <button
                    role="option"
                    aria-selected={language === "en"}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                    onClick={() => {
                      setLanguage("en");
                      setLanguageOpen(false);
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
                      setLanguageOpen(false);
                    }}
                  >
                    हिन्दी
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Auth Actions */}
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 min-w-[200px] overflow-hidden rounded-md border border-amber-300 bg-amber-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 z-50">
                      <div className="px-3 py-2 border-b border-amber-200 dark:border-neutral-700">
                        <p className="text-sm font-medium text-amber-900 dark:text-neutral-200">{user.name}</p>
                        <p className="text-xs text-amber-700 dark:text-neutral-400">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <Link
                        href="/investments"
                        className="block px-3 py-2 text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Investments
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-3 py-2 text-sm hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors text-red-600 dark:text-red-400"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-amber-50 dark:bg-neutral-900 border-l border-amber-300 dark:border-neutral-700 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-neutral-700">
              <h2 className="text-lg font-semibold text-amber-900 dark:text-neutral-200">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 hover:bg-amber-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* User Info */}
              {user && (
                <div className="pb-4 border-b border-amber-200 dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-900 dark:text-neutral-200">{user.name}</p>
                      <p className="text-sm text-amber-700 dark:text-neutral-400">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-amber-900 hover:bg-amber-200 dark:text-neutral-300 dark:hover:bg-neutral-800 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {user && (
                  <>
                    <Link
                      href="/investments"
                      className="block px-3 py-2 rounded-md text-amber-900 hover:bg-amber-200 dark:text-neutral-300 dark:hover:bg-neutral-800 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Investments
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-3 py-2 rounded-md text-amber-900 hover:bg-amber-200 dark:text-neutral-300 dark:hover:bg-neutral-800 font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </>
                )}
              </nav>

              {/* Language Selector */}
              <div className="pt-4 border-t border-amber-200 dark:border-neutral-700">
                <p className="text-sm font-medium text-amber-900 dark:text-neutral-200 mb-2">Language</p>
                <div className="space-y-1">
                  <button
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      language === "en" 
                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" 
                        : "text-amber-900 hover:bg-amber-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    }`}
                    onClick={() => {
                      setLanguage("en");
                      setMobileMenuOpen(false);
                    }}
                  >
                    English
                  </button>
                  <button
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      language === "hi" 
                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" 
                        : "text-amber-900 hover:bg-amber-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    }`}
                    onClick={() => {
                      setLanguage("hi");
                      setMobileMenuOpen(false);
                    }}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Auth Actions */}
              {!loading && (
                <div className="pt-4 border-t border-amber-200 dark:border-neutral-700">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type SupportedLanguage = "en" | "hi";

type TranslationMap = Record<string, string>;

type LocaleResources = Record<SupportedLanguage, TranslationMap>;

const LANGUAGE_STORAGE_KEY = "saral-site.language";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  hasChosenLanguage: boolean;
  markChosen: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "hi") return stored;
  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("hi")) return "hi";
  return "en";
}

export function LanguageProvider({
  children,
  resources,
}: {
  children: React.ReactNode;
  resources: LocaleResources;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);
  const [hasChosenLanguage, setHasChosenLanguage] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) !== null;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const t = useMemo(() => {
    const dict = resources[language] || {};
    return (key: string) => dict[key] ?? key;
  }, [language, resources]);

  const markChosen = () => setHasChosenLanguage(true);

  const value = useMemo(
    () => ({ language, setLanguage, t, hasChosenLanguage, markChosen }),
    [language, t, hasChosenLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export type { SupportedLanguage, TranslationMap, LocaleResources };



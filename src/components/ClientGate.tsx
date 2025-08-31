"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LanguageProvider, SupportedLanguage } from "@/lib/i18n";
import LoadingSpinner from "./LoadingSpinner";

const LANG_KEY = "saral-site.language";

export default function ClientGate({
  resources,
  children,
}: {
  resources: Record<SupportedLanguage, Record<string, string>>;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);


  useEffect(() => {
    // Resolve language on client only
    const stored = (window.localStorage.getItem(LANG_KEY) as SupportedLanguage | null) ?? null;
    const resolved: SupportedLanguage = stored ?? (navigator.language.toLowerCase().startsWith("hi") ? "hi" : "en");
    // Persist to cookie and localStorage
    document.cookie = `${LANG_KEY}=${resolved}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.localStorage.setItem(LANG_KEY, resolved);
    setReady(true);
  }, []);

  const content = useMemo(() => {
    if (!ready) {
      return (
       <LoadingSpinner isLoading = {!ready} 
       duration = {3000} />
      );
    }
    return (
      <LanguageProvider resources={resources}>
        {children}
      </LanguageProvider>
    );
  }, [ready, resources, children]);

  return content;
}



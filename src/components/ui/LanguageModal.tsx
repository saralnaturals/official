"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageModal() {
  const { hasChosenLanguage, setLanguage, markChosen, t } = useLanguage();

  if (hasChosenLanguage) return null;

  const choose = (lang: "en" | "hi") => {
    setLanguage(lang);
    markChosen();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
        >
          <h2 className="mb-3 text-center text-lg font-semibold">{t("language.choose")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => choose("hi")}
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              {t("language.hindi")}
            </button>
            <button
              onClick={() => choose("en")}
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              {t("language.english")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



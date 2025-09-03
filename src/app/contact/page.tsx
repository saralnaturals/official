"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/lib/i18n";

const FormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactPage() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  async function onSubmit(values: FormValues) {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      alert(t("contact.success"));
      reset();
    } catch {
      alert(t("contact.error"));
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900 dark:text-neutral-100">{t("contact.title")}</h1>
        <p className="mt-2 text-amber-700 dark:text-neutral-300">{t("contact.subtitle")}</p>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-8 border border-amber-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100 mb-4">Get in Touch</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-amber-900 dark:text-neutral-200 min-w-[60px]">Email:</span>
            <a 
              href="mailto:product.saralnaturals@gmail.com"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              product.saralnaturals@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-amber-900 dark:text-neutral-200 min-w-[60px]">Phone:</span>
            <a 
              href="tel:+919213414228"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              +91 9213414228
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-amber-900 dark:text-neutral-200 min-w-[60px]">WhatsApp:</span>
            <a 
              href="https://wa.me/919213414228"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              +91 9213414228
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-amber-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100 mb-4">Send us a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <label className="grid gap-1 text-sm">
          {t("contact.name")}
          <input className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" {...register("name")} />
        </label>
        <label className="grid gap-1 text-sm">
          {t("contact.email")}
          <input className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" type="email" {...register("email")} />
        </label>
        <label className="grid gap-1 text-sm">
          {t("contact.phone")}
          <input className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" {...register("phone")} />
        </label>
        <label className="grid gap-1 text-sm">
          {t("contact.message")}
          <textarea className="min-h-[120px] rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" {...register("message")} />
        </label>
        <button disabled={isSubmitting} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60">
          {t("contact.submit")}
        </button>
        </form>
      </div>
    </main>
  );
}



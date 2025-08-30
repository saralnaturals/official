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
      <h1 className="text-2xl font-semibold">{t("contact.title")}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t("contact.subtitle")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
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
    </main>
  );
}



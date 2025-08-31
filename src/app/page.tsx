"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteContent } from "@/data/site-content";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { brandAssets } from "@/lib/brand";
import HeroCarousel from "@/components/HeroCarousel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function Home() {
  const { t } = useLanguage();
  const lang = useLanguage().language;
  const sc = siteContent[lang];

  // Hero carousel images
  const heroImages = [
    {
      src: "/brand/homePageImage.png",
      alt: "Saral Naturals Farm",
      title: "Sustainable Farming",
      subtitle: "Organic practices that respect nature"
    },
    {
      src: "/homePage/productionHouse.png",
      alt: "Saral Naturals Production House",
      title: "Production House",
      subtitle: "Hygienic production and dispatching"
    },
    {
      src: "/brand/homPageImageOther.png",
      alt: "Natural Products",
      title: "Pure Natural Products",
      subtitle: "Handcrafted with care and tradition"
    },
    {
      src: "/homePage/productionHouseSecondView.png",
      alt: "Saral Naturals Production House Internal View",
      title: "Inside Production House ",
      subtitle: "Clean and hygienic production environment"
    },
    {
      src: "/premiumDairy.png",
      alt: "Premium Dairy Products",
      title: "Premium Dairy",
      subtitle: "High-quality products from happy cows"
    },
    {
      src: "/innovativeAlternatives.png",
      alt: "Innovative Solutions",
      title: "Innovative Alternatives",
      subtitle: "Exploring sustainable solutions"
    }
  ];

  return (
    <>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4">
        <section className="grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-2">
          <div>
            <motion.h1 className="text-3xl font-bold leading-normal md:text-5xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {sc.hero.title}
            </motion.h1>
            <motion.p className="mt-4 text-neutral-600 dark:text-neutral-300" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {sc.hero.subtitle}
            </motion.p>
            <div className="mt-6 flex gap-3">
              <Link href="/investments" className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                {t("cta.getStarted")}
              </Link>
              <Link href="/products" className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
                {t("nav.products")}
              </Link>
            </div>

          </div>
          <HeroCarousel images={heroImages} autoChangeInterval={8000} />
        </section>

        <section className="py-10">
          <h2 className="text-xl font-semibold">{sc.differentiators.heading}</h2>
          <ul className="mt-4 list-disc pl-6 text-neutral-700 dark:text-neutral-300">
            {sc.differentiators.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <section className="py-10">
          <h2 className="text-xl font-semibold">{sc.products.heading}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {sc.products.entries.map((p) => (
              <div key={p.title} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <h3 className="text-base font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-xl font-semibold">{sc.markets.heading}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {sc.markets.items.map((m) => (
              <span key={m} className="rounded-full border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700">
                {m}
              </span>
            ))}
          </div>
        </section>

        {sc.stats && <Stats heading={sc.stats.heading} items={sc.stats.items} />}
        {sc.faq && <FAQ heading={sc.faq.heading} items={sc.faq.items} />}
        {sc.cta && (
          <CTA heading={sc.cta.heading} subheading={sc.cta.subheading} primaryText={sc.cta.primaryText} primaryHref={sc.cta.primaryHref} />
        )}
      </main>
    </>
  );
}

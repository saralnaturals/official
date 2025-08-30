"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { investmentSchemes } from "@/data/investments";

import InvestmentHero from "@/components/InvestmentHero";
import BusinessOverview from "@/components/BusinessOverview";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import TermsAccordion from "@/components/TermsAccordion";
import InvestmentFooter from "@/components/InvestmentFooter";

export default function InvestmentsPage() {
  const { t, language } = useLanguage();

  const rows = [
    { amount: 25000, share: "0.25%", p30: 7500, p15: 3750 },
    { amount: 50000, share: "0.50%", p30: 15000, p15: 7500 },
    { amount: 75000, share: "0.75%", p30: 22500, p15: 11250 },
    { amount: 100000, share: "1.00%", p30: 30000, p15: 15000 },
    { amount: 125000, share: "1.25%", p30: 37500, p15: 18750 },
    { amount: 150000, share: "1.50%", p30: 45000, p15: 22500 },
    { amount: 175000, share: "1.75%", p30: 52500, p15: 26250 },
    { amount: 200000, share: "2.00%", p30: 60000, p15: 30000 },
  ];

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <main className="bg-stone-50 text-stone-800">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        {/* Hero Section */}
        <InvestmentHero />

        {/* Business Overview Section */}
        <BusinessOverview />

        {/* Interactive Calculator Section */}
        <InvestmentCalculator />

        {/* Existing Investment Table */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("nav.investments")}</h2>
            <p className="text-stone-600">
              {language === "hi" 
                ? "टिकाऊ विकास के लिए तैयार हमारी निवेश योजनाओं का अन्वेषण करें।"
                : "Explore our investment schemes tailored for sustainable growth."
              }
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="w-full min-w-[840px] text-left">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {language === "hi" ? "निवेश राशि (भारतीय रुपया)" : "Investment Amount (INR)"}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {language === "hi" ? "आपका लाभ" : "Your Profit Share"}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {language === "hi"
                      ? "₹30 लाख की कुल आय पर अनुमानित मासिक लाभ"
                      : "Projected Monthly Profit (If revenue is ₹30 Lakhs)"}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">
                    {language === "hi"
                      ? "₹15 लाख की कुल आय पर अनुमानित मासिक लाभ"
                      : "Projected Monthly Profit (If revenue is ₹15 Lakhs)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {rows.map((r) => (
                  <tr key={r.amount} className="bg-white">
                    <td className="px-4 py-3 font-medium">{formatINR(r.amount)}</td>
                    <td className="px-4 py-3">{r.share}</td>
                    <td className="px-4 py-3">{formatINR(r.p30)}</td>
                    <td className="px-4 py-3">{formatINR(r.p15)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Investment Schemes Links */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {investmentSchemes.map((s) => (
              <Link 
                key={s.slug} 
                href={`/investments/${s.slug}`} 
                className="rounded-lg border border-stone-200 p-4 hover:bg-stone-50 bg-white"
              >
                <h2 className="text-lg font-medium">
                  {t("nav.investments")} · {s.title.en}
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {s.summary.en}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Terms and Conditions Section */}
        <TermsAccordion />

        {/* Footer */}
        <InvestmentFooter />
      </div>
    </main>
  );
}



import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import ClientGate from "@/components/ClientGate";
import en from "@/lib/locales/en.json";
import hi from "@/lib/locales/hi.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageModal from "@/components/ui/LanguageModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saral Naturals",
  description: "Simple, Sustainable, and Natural",
  metadataBase: new URL("https://www.saralnaturals.com"),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Saral Naturals",
    description: "Simple, Sustainable, and Natural",
    type: "website",
    url: "https://www.saralnaturals.com/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Saral Naturals",
      },
    ],
  },
  keywords: [
    "Saral Naturals",
    "sustainable agriculture",
    "natural products",
    "investment schemes"
  ],
  other: {
    "ai-topic": "sustainable agriculture, natural products, investment schemes",
    "ai-brand": "Saral Naturals",
    "ai-locale": "en,hi"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviderClient>
          <ClientGate resources={{ en: en as Record<string, string>, hi: hi as Record<string, string> }}>
            <Header />
            {children}
            <Footer />
            <LanguageModal />
          </ClientGate>
        </ThemeProviderClient>
      </body>
    </html>
  );
}

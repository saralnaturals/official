import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ThemeProviderClient intentionally not used in root layout to avoid client-only provider issues.
import ClientGate from "@/components/ClientGate";
import InitialLoadingWrapper from "@/components/InitialLoadingWrapper";
import en from "@/lib/locales/en.json";
import hi from "@/lib/locales/hi.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageModal from "@/components/ui/LanguageModal";
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saral Naturals - Premium Dairy Products",
  description: "Discover premium dairy products from Saral Naturals. Sustainable farming, organic practices, and high-quality products.",
  keywords: "dairy, milk, organic, sustainable, farming, natural products",
  authors: [{ name: "Saral Naturals" }],
  creator: "Saral Naturals",
  publisher: "Saral Naturals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saral-naturals.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Saral Naturals - Premium Dairy Products",
    description: "Discover premium dairy products from Saral Naturals. Sustainable farming, organic practices, and high-quality products.",
    url: "https://saral-naturals.com",
    siteName: "Saral Naturals",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Saral Naturals",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saral Naturals - Premium Dairy Products",
    description: "Discover premium dairy products from Saral Naturals. Sustainable farming, organic practices, and high-quality products.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {/* <ThemeProviderClient> */}
          <ClientGate resources={{ en: en as Record<string, string>, hi: hi as Record<string, string> }}>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
              <LanguageModal />
            </AuthProvider>
          </ClientGate>
        {/* </ThemeProviderClient> */}
        <InitialLoadingWrapper />
      </body>
    </html>
  );
}

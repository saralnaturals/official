"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";

export default function AboutPage() {
  const { language } = useLanguage();

  // Sample gallery images - you can replace these with actual images
  const galleryImages = [
    {
      src: "/brand/homePageImage.png",
      alt: "Saral Naturals Farm",
      title: "Our Sustainable Farm",
      description: "Organic farming practices that respect nature"
    },
    {
      src: "/brand/homPageImageOther.png",
      alt: "Natural Products",
      title: "Pure Natural Products",
      description: "Handcrafted with care and tradition"
    },
    {
      src: "/brand/logo-en.png",
      alt: "Saral Naturals Logo",
      title: "Our Brand",
      description: "Simple, Sustainable, and Natural"
    },
    {
      src: "/premiumDairy.png",
      alt: "Premium Dairy Products",
      title: "Premium Dairy",
      description: "High-quality dairy products from happy cows"
    },
    {
      src: "/innovativeAlternatives.png",
      alt: "Innovative Alternatives",
      title: "Innovative Solutions",
      description: "Exploring sustainable alternatives to traditional products"
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-neutral-200 mb-6">
          {language === "hi" ? "हमारे बारे में" : "About Us"}
        </h1>
        <p className="text-xl text-amber-700 dark:text-neutral-400 max-w-3xl mx-auto">
          {language === "hi"
            ? "सरल, टिकाऊ और प्राकृतिक - यही है हमारा मिशन"
            : "Simple, Sustainable, and Natural - That's our mission"
          }
        </p>
      </div>

      {/* Main Content */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "हमारी कहानी" : "Our Story"}
            </h2>
            <p className="text-amber-700 dark:text-neutral-400 mb-4 leading-relaxed">
              {language === "hi"
                ? "सरल नेचुरल्स की शुरुआत एक सरल विचार से हुई - प्रकृति के साथ सामंजस्य बनाकर रहना और ऐसे उत्पाद बनाना जो न केवल अच्छे हों बल्कि हमारे ग्रह के लिए भी अच्छे हों।"
                : "Saral Naturals began with a simple idea - to live in harmony with nature and create products that are not only good for us but also good for our planet."
              }
            </p>
            <p className="text-amber-700 dark:text-neutral-400 mb-4 leading-relaxed">
              {language === "hi"
                ? "हमारी यात्रा 2020 में शुरू हुई, जब हमने देखा कि कैसे पारंपरिक कृषि पद्धतियां हमारे पर्यावरण को प्रभावित कर रही हैं। हमने फैसला किया कि कुछ अलग करना होगा।"
                : "Our journey began in 2020, when we saw how traditional farming practices were affecting our environment. We decided something had to change."
              }
            </p>
            <p className="text-amber-700 dark:text-neutral-400 leading-relaxed">
              {language === "hi"
                ? "आज, हम गर्व से कह सकते हैं कि हमारे सभी उत्पाद 100% प्राकृतिक हैं और टिकाऊ कृषि पद्धतियों का उपयोग करके बनाए गए हैं।"
                : "Today, we're proud to say that all our products are 100% natural and made using sustainable farming practices."
              }
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-neutral-800 p-8 rounded-xl border border-amber-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold mb-4 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "हमारे मूल्य" : "Our Values"}
            </h3>
            <ul className="space-y-3 text-amber-700 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                {language === "hi" ? "प्राकृतिकता - कोई कृत्रिम तत्व नहीं" : "Naturality - No artificial ingredients"}
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                {language === "hi" ? "टिकाऊपन - पर्यावरण का सम्मान" : "Sustainability - Respect for environment"}
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                {language === "hi" ? "गुणवत्ता - सर्वोच्च मानक" : "Quality - Highest standards"}
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                {language === "hi" ? "पारदर्शिता - पूरी जानकारी" : "Transparency - Full disclosure"}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-amber-50 dark:bg-neutral-800 p-8 rounded-xl border border-amber-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold mb-4 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "हमारा मिशन" : "Our Mission"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400 leading-relaxed">
              {language === "hi"
                ? "हमारा मिशन है प्राकृतिक और टिकाऊ उत्पादों को सभी के लिए सुलभ बनाना, जबकि हमारे ग्रह की रक्षा करना और स्थानीय समुदायों का समर्थन करना।"
                : "Our mission is to make natural and sustainable products accessible to everyone while protecting our planet and supporting local communities."
              }
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-neutral-800 p-8 rounded-xl border border-amber-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold mb-4 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "हमारी दृष्टि" : "Our Vision"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400 leading-relaxed">
              {language === "hi"
                ? "हम एक ऐसी दुनिया की कल्पना करते हैं जहां प्राकृतिक उत्पाद आदर्श हैं, न कि अपवाद, और जहां हर कोई स्वस्थ जीवन जी सके।"
                : "We envision a world where natural products are the norm, not the exception, and where everyone can live a healthy life."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900 dark:text-neutral-200">
          {language === "hi" ? "हमारी टीम" : "Our Team"}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="">
              <Image 
                src="/priyankaDp.png" 
                alt="Priyanka - CEO" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-amber-200 dark:border-neutral-600" 
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "प्रियंका" : "Priyanka"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400">
              {language === "hi" ? "CEO" : "CEO"}
            </p>
          </div>
          <div className="text-center">
            <div className="">
              <Image 
                src="/vijayDp.png" 
                alt="Vijay - Co-Founder" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-amber-200 dark:border-neutral-600" 
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "विजय" : "Vijay"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400">
              {language === "hi" ? "सह-संस्थापक" : "Co-Founder"}
            </p>
          </div>
          <div className="text-center">
            <div className="">
              <Image 
                src="/amanDp.jpg" 
                alt="Aman - Co-Founder" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-amber-200 dark:border-neutral-600" 
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "अमन" : "Aman"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400">
              {language === "hi" ? "सह-संस्थापक" : "Co-Founder"}
            </p>
          </div>
          <div className="text-center">
            <div className="">
              <Image 
                src="/subodhDp.png" 
                alt="Subodh - Product Manager" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-amber-200 dark:border-neutral-600" 
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-neutral-200">
              {language === "hi" ? "सुबोध" : "Subodh"}
            </h3>
            <p className="text-amber-700 dark:text-neutral-400">
              {language === "hi" ? "उत्पाद प्रबंधक" : "Product Manager"}
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery - Moved to End for Better UX */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-neutral-200 mb-4">
            {language === "hi" ? "हमारी यात्रा" : "Our Journey"}
          </h2>
          <p className="text-lg text-amber-700 dark:text-neutral-400 max-w-2xl mx-auto">
            {language === "hi"
              ? "हमारी कंपनी की यात्रा को देखें - प्रकृति के साथ सामंजस्य बनाकर कैसे हमने अपने सपनों को साकार किया"
              : "Take a look at our company's journey - how we've brought our dreams to life in harmony with nature"
            }
          </p>
        </div>
        <ImageGallery
          images={galleryImages}
          autoScrollInterval={4000}
          showTitles={true}
        />
      </section>

      {/* Contact CTA */}
      <section className="text-center bg-amber-50 dark:bg-neutral-800 p-8 rounded-xl border border-amber-200 dark:border-neutral-700">
        <h2 className="text-2xl font-bold mb-4 text-amber-900 dark:text-neutral-200">
          {language === "hi" ? "हमसे जुड़ें" : "Get in Touch"}
        </h2>
        <p className="text-amber-700 dark:text-neutral-400 mb-6">
          {language === "hi"
            ? "हमारे बारे में और जानने के लिए या सहयोग के लिए हमसे संपर्क करें।"
            : "Contact us to learn more about us or to collaborate."
          }
        </p>
        <a
          href="/contact"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          {language === "hi" ? "संपर्क करें" : "Contact Us"}
        </a>
      </section>
    </main>
  );
}



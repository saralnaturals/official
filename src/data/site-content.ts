export type SiteContent = {
  hero: { title: string; subtitle: string };
  about: { heading: string; body: string };
  differentiators: { heading: string; items: string[] };
  products: { heading: string; entries: { title: string; description: string; image: string }[] };
  markets: { heading: string; items: string[] };
  investmentNote: { heading: string; body: string };
  contact: { phone: string; email: string; address: string; website: string };
  stats?: { heading: string; items: { label: string; value: string }[] };
  faq?: { heading: string; items: { q: string; a: string }[] };
  cta?: { heading: string; subheading: string; primaryText: string; primaryHref: string };
  testimonials?: { heading: string; subtitle: string; items: { name: string; role: string; text: string }[] };
  news?: { heading: string; subtitle: string; items: { title: string; date: string; excerpt: string }[] };
  team?: { heading: string; subtitle: string; members: { name: string; role: string; bio: string }[] };
  features?: { heading: string; items: { title: string; description: string; icon: string }[] };
  certifications?: { heading: string; items: string[] };
  sustainability?: { heading: string; body: string; practices: string[] };
};

export const siteContent: Record<"en" | "hi", SiteContent> = {
  en: {
    hero: {
      title: "Cultivating Quality, Growing Prosperity",
      subtitle:
        "Welcome to Saral Naturals. Join our growth story delivering high-quality dairy and innovative vegetarian alternatives across India.",
    },
    about: {
      heading: "Welcome to Our Company",
      body:
        "At SARAL NATURALS, our vision is to become the largest and most trusted supplier of high-quality dairy products and innovative non-vegetarian alternatives across urban and rural India. We are building a legacy of quality, consistency, and community impact.",
    },
    differentiators: {
      heading: "What Sets Saral Naturals Apart",
      items: [
        "Quality & Consistency: Delivering purity, taste, and freshness every time.",
        "Dual Market Focus: Serving both urban convenience and rural accessibility.",
        "Strong Growth Plan: Aggressive market penetration to become a dominant regional player.",
        "Innovation: Constantly developing new products based on market needs.",
        "Sustainability: Eco-friendly practices that protect the environment.",
        "Community Impact: Creating positive change in local communities.",
      ],
    },
    products: {
      heading: "Diverse Product Portfolio",
      entries: [
        {
          title: "Premium Dairy",
          description:
            "Fresh milk, dahi (yogurt), paneer, flavored milk, and flavored dahi with guaranteed freshness and quality standards.",
          image: "/premiumDairy.png",
        },
        {
          title: "Innovative Alternatives",
          description:
            "Delicious soya chaap and other plant-based alternatives that provide wholesome nutrition without compromise.",
          image: "/innovativeAlternatives.png",
        },
        {
          title: "Future Expansion",
          description:
            "Specialized dairy: khoa, butter, ghee, cream, and ice cream for broader market reach and customer satisfaction.",
          image: "/futureExpansion.png",
        },
      ],
    },
    markets: {
      heading: "Our Market Penetration Targets",
      items: ["50+ Hotels", "Canteens", "Restaurants", "Banquet Halls", "Retailer Shops", "Rural Communities"],
    },
    stats: {
      heading: "Growth by Numbers",
      items: [
        { label: "Target Clients (3 months)", value: "250+" },
        { label: "Projected Profit Margin", value: "50%" },
        { label: "Market Coverage", value: "Urban & Rural" },
        { label: "Product Categories", value: "10+" },
        { label: "Business Partners", value: "100+" },
        { label: "Quality Certifications", value: "5+" }
      ],
    },
    investmentNote: {
      heading: "Grow with Saral Naturals",
      body:
        "We offer a unique opportunity to participate in our expansion with transparent partnerships. Profit sharing projected to commence after 3 months, with an anticipated 200% return within 36 months (subject to business performance). Investment period limited until September 30, 2025.",
    },
    faq: {
      heading: "Frequently Asked Questions",
      items: [
        { q: "What products do you offer?", a: "We offer fresh milk, dahi, paneer, flavored milk/dahi, and vegetarian soya chaap. Our future expansion includes khoa, butter, ghee, cream, and ice cream." },
        { q: "Do you serve rural areas?", a: "Yes, our business model is specifically designed for both urban convenience and rural accessibility, ensuring quality products reach all communities." },
        { q: "How do I invest in Saral Naturals?", a: "Visit our investments page to view current opportunities. Contact us directly for detailed terms, timelines, and investment procedures." },
        { q: "What are your quality standards?", a: "We maintain the highest standards of purity, taste, and freshness. All products undergo rigorous quality checks and meet food safety regulations." },
        { q: "How do you ensure product freshness?", a: "Our efficient supply chain ensures products reach customers within hours of production, maintaining maximum freshness from farm to table." },
        { q: "What is your delivery system?", a: "We have a comprehensive delivery network serving hotels, restaurants, canteens, and retail shops with reliable and timely delivery services." },
        { q: "Are your products certified?", a: "Yes, our products meet all food safety standards and certifications required by Indian regulations. We maintain ISO and FSSAI certifications." },
        { q: "What makes you different from competitors?", a: "Our dual market focus, commitment to quality, innovative product range, and community impact set us apart in the dairy industry." },
        { q: "How do you support local communities?", a: "We create employment opportunities, support local farmers, and contribute to economic growth in both urban and rural areas." },
        { q: "What are your sustainability practices?", a: "We use eco-friendly packaging, implement waste reduction programs, and support sustainable farming practices to minimize environmental impact." },
        { q: "Can I become a business partner?", a: "Yes, we welcome partnerships with hotels, restaurants, and retailers. Contact us to discuss partnership opportunities and terms." },
        { q: "What are your expansion plans?", a: "We plan to expand our product range, increase market presence, and establish more distribution centers across India in the next 3 years." }
      ],
    },
    cta: {
      heading: "Ready to partner with Saral Naturals?",
      subheading: "Join our journey to deliver quality and prosperity across India.",
      primaryText: "View Investment Opportunities",
      primaryHref: "/investments"
    },
    testimonials: {
      heading: "What Our Partners Say",
      subtitle: "Hear from our valued business partners and customers",
      items: [
        {
          name: "Rajesh Kumar",
          role: "Hotel Manager, Grand Plaza",
          text: "Saral Naturals has consistently delivered high-quality dairy products. Their reliability and freshness have made them our preferred supplier."
        },
        {
          name: "Priya Sharma",
          role: "Restaurant Owner, Spice Garden",
          text: "The quality of their paneer and dahi has significantly improved our menu. Our customers love the freshness and taste."
        },
        {
          name: "Amit Patel",
          role: "Canteen Manager, Tech Park",
          text: "Their delivery service is excellent and the products always meet our quality expectations. Highly recommended!"
        }
      ]
    },
    news: {
      heading: "Latest News & Updates",
      subtitle: "Stay updated with our latest developments and achievements",
      items: [
        {
          title: "Saral Naturals Expands to 50+ Hotels",
          date: "August 2024",
          excerpt: "We're proud to announce our partnership with 50+ premium hotels across the region, marking a significant milestone in our growth journey."
        },
        {
          title: "New Product Line Launch",
          date: "July 2024",
          excerpt: "Introducing our new range of flavored dairy products and innovative vegetarian alternatives to meet growing market demands."
        },
        {
          title: "Quality Certification Achieved",
          date: "June 2024",
          excerpt: "Saral Naturals has received ISO 22000 certification, reaffirming our commitment to food safety and quality standards."
        }
      ]
    },
    team: {
      heading: "Our Leadership Team",
      subtitle: "Meet the visionaries behind Saral Naturals",
      members: [
        {
          name: "Arun Singh",
          role: "Chief Executive Officer",
          bio: "With 15+ years in dairy industry, Arun leads our mission to deliver quality products across India."
        },
        {
          name: "Meera Kapoor",
          role: "Chief Operations Officer",
          bio: "Meera ensures operational excellence and maintains our high quality standards across all facilities."
        },
        {
          name: "Vikram Malhotra",
          role: "Chief Financial Officer",
          bio: "Vikram manages our financial strategy and investor relations, ensuring sustainable growth."
        }
      ]
    },
    features: {
      heading: "Why Choose Saral Naturals",
      items: [
        {
          title: "Premium Quality",
          description: "Every product meets the highest standards of purity, taste, and freshness with guaranteed quality assurance.",
          icon: "star"
        },
        {
          title: "Guaranteed Freshness",
          description: "From farm to table, we ensure maximum freshness with our efficient supply chain and quick delivery system.",
          icon: "leaf"
        },
        {
          title: "Wide Market Reach",
          description: "Serving both urban convenience seekers and rural communities with equal dedication and quality standards.",
          icon: "map"
        },
        {
          title: "Continuous Innovation",
          description: "Constantly developing new products and improving existing ones based on market needs and customer feedback.",
          icon: "lightbulb"
        },
        {
          title: "Sustainable Practices",
          description: "Eco-friendly practices that protect the environment while delivering quality products to our customers.",
          icon: "recycle"
        },
        {
          title: "Community Focus",
          description: "Creating positive impact in local communities through employment opportunities and economic growth initiatives.",
          icon: "users"
        }
      ]
    },
    certifications: {
      heading: "Quality Certifications",
      items: [
        "ISO 22000:2018 - Food Safety Management",
        "FSSAI License - Food Safety Standards",
        "HACCP Certification - Hazard Analysis",
        "GMP Certification - Good Manufacturing Practices",
        "Organic Certification - Natural Products"
      ]
    },
    sustainability: {
      heading: "Our Sustainability Commitment",
      body: "At Saral Naturals, we believe in sustainable business practices that protect our environment while delivering quality products to our customers.",
      practices: [
        "Eco-friendly packaging materials",
        "Waste reduction and recycling programs",
        "Energy-efficient production processes",
        "Support for sustainable farming practices",
        "Water conservation initiatives",
        "Carbon footprint reduction programs"
      ]
    },
    contact: {
      phone: "+91 92134 14228",
      email: "saralnaturals@gmail.com",
      address: "Gandhi Nagar, Basti, UP 272001",
      website: "https://www.saralnaturals.com",
    },
  },
  hi: {
    hero: {
      title: "गुणवत्ता की खेती, समृद्धि की वृद्धि",
      subtitle:
        "सरल नेचुरल्स में आपका स्वागत है। उच्च गुणवत्ता वाले डेयरी और नवीन शाकाहारी विकल्प पूरे भारत में पहुंचाने के हमारे सफर से जुड़ें।",
    },
    about: {
      heading: "हमारी कंपनी में आपका स्वागत है",
      body:
        "सरल नेचुरल्स का लक्ष्य शहर और गाँव दोनों में उच्च गुणवत्ता वाले डेयरी उत्पाद और नवीन नॉन-वेज विकल्प पहुँचाना है। हम गुणवत्ता, निरंतरता और सामाजिक प्रभाव की पहचान बना रहे हैं।",
    },
    differentiators: {
      heading: "सरल नेचुरल्स की विशेषताएँ",
      items: [
        "उत्तम गुणवत्ता और निरंतरता: हर बार शुद्धता, स्वाद और ताजगी।",
        "गाँव से शहर तक पहुंच: शहरी सुविधा और ग्रामीण सुलभता दोनों पर ध्यान।",
        "मजबूत विकास योजना: तेज़ बाजार विस्तार और क्षेत्रीय नेतृत्व की दिशा।",
        "नवाचार: बाजार की जरूरतों के आधार पर नए उत्पाद विकसित करना।",
        "स्थिरता: पर्यावरण की रक्षा करने वाली पर्यावरण-अनुकूल प्रथाएं।",
        "सामुदायिक प्रभाव: स्थानीय समुदायों में सकारात्मक परिवर्तन पैदा करना।",
      ],
    },
    products: {
      heading: "उत्पादों की विस्तृत श्रृंखला",
      entries: [
        {
          title: "उत्तम डेयरी",
          description:
            "ताज़ा दूध, दही, पनीर, फ्लेवर्ड मिल्क और फ्लेवर्ड दही गारंटीड ताजगी और गुणवत्ता मानकों के साथ।",
          image: "/premiumDairy.png",
        },
        {
          title: "कुछ नया और अलग",
          description:
            "स्वाद और पौष्टिकता से भरपूर सोया चाप और अन्य पौधे-आधारित विकल्प जो समझौता किए बिना पौष्टिक पोषण प्रदान करते हैं।",
          image: "/innovativeAlternatives.png",
        },
        {
          title: "भविष्य विस्तार",
          description:
            "खोआ, मक्खन, घी, क्रीम और आइसक्रीम जैसे विशेष डेयरी उत्पाद व्यापक बाजार पहुंच और ग्राहक संतुष्टि के लिए।",
          image: "/futureExpansion.png",
        },
      ],
    },
    markets: {
      heading: "हमारे बाज़ार लक्ष्य",
      items: ["50+ होटल", "कैंटीन", "रेस्टोरेंट", "बैंक्वेट हॉल", "रिटेलर दुकानें", "ग्रामीण समुदाय"],
    },
    stats: {
      heading: "संख्याओं में विकास",
      items: [
        { label: "लक्ष्य ग्राहक (3 माह)", value: "250+" },
        { label: "अनुमानित लाभ मार्जिन", value: "50%" },
        { label: "बाजार कवरेज", value: "शहरी और ग्रामीण" },
        { label: "उत्पाद श्रेणियां", value: "10+" },
        { label: "व्यावसायिक साझेदार", value: "100+" },
        { label: "गुणवत्ता प्रमाणपत्र", value: "5+" }
      ],
    },
    investmentNote: {
      heading: "सरल नेचुरल्स के साथ बढ़ें",
      body:
        "हम पारदर्शी साझेदारी के साथ विस्तार का अवसर प्रदान करते हैं। निवेश के 3 महीने बाद लाभ-वितरण प्रारंभ होने की अपेक्षा, और 36 महीनों में 200% प्रतिफल की आशा (व्यापार प्रदर्शन के अनुसार)। निवेश अवधि 30 सितंबर, 2025 तक सीमित।",
    },
    faq: {
      heading: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        { q: "आपके उत्पाद क्या हैं?", a: "हम ताज़ा दूध, दही, पनीर, फ्लेवर्ड मिल्क/दही और शाकाहारी सोया चाप प्रदान करते हैं। हमारे भविष्य के विस्तार में खोआ, मक्खन, घी, क्रीम और आइसक्रीम शामिल हैं।" },
        { q: "क्या आप गाँवों को सेवा देते हैं?", a: "हाँ, हमारा व्यवसाय मॉडल विशेष रूप से शहरी सुविधा और ग्रामीण सुलभता दोनों के लिए बनाया गया है, यह सुनिश्चित करता है कि गुणवत्तापूर्ण उत्पाद सभी समुदायों तक पहुंचें।" },
        { q: "सरल नेचुरल्स में निवेश कैसे करें?", a: "वर्तमान अवसरों को देखने के लिए हमारे निवेश पेज पर जाएं। विस्तृत शर्तों, समयसीमा और निवेश प्रक्रियाओं के लिए सीधे हमसे संपर्क करें।" },
        { q: "आपके गुणवत्ता मानक क्या हैं?", a: "हम शुद्धता, स्वाद और ताजगी के उच्चतम मानकों को बनाए रखते हैं। सभी उत्पाद कठोर गुणवत्ता जांच से गुजरते हैं और खाद्य सुरक्षा नियमों को पूरा करते हैं।" },
        { q: "आप उत्पाद ताजगी कैसे सुनिश्चित करते हैं?", a: "हमारी कुशल आपूर्ति श्रृंखला सुनिश्चित करती है कि उत्पाद उत्पादन के घंटों के भीतर ग्राहकों तक पहुंचें, खेत से टेबल तक अधिकतम ताजगी बनाए रखें।" },
        { q: "आपकी डिलीवरी प्रणाली क्या है?", a: "हमारे पास होटल, रेस्टोरेंट, कैंटीन और रिटेल दुकानों की सेवा के लिए एक व्यापक डिलीवरी नेटवर्क है जो विश्वसनीय और समय पर डिलीवरी सेवाएं प्रदान करता है।" },
        { q: "क्या आपके उत्पाद प्रमाणित हैं?", a: "हाँ, हमारे उत्पाद भारतीय नियमों द्वारा आवश्यक सभी खाद्य सुरक्षा मानकों और प्रमाणपत्रों को पूरा करते हैं। हम ISO और FSSAI प्रमाणपत्र बनाए रखते हैं।" },
        { q: "आप प्रतिस्पर्धियों से कैसे अलग हैं?", a: "हमारा दोहरा बाजार फोकस, गुणवत्ता के प्रति प्रतिबद्धता, नवीन उत्पाद श्रृंखला और सामुदायिक प्रभाव हमें डेयरी उद्योग में अलग करते हैं।" },
        { q: "आप स्थानीय समुदायों का समर्थन कैसे करते हैं?", a: "हम रोजगार के अवसर पैदा करते हैं, स्थानीय किसानों का समर्थन करते हैं और शहरी और ग्रामीण दोनों क्षेत्रों में आर्थिक विकास में योगदान करते हैं।" },
        { q: "आपकी स्थिरता प्रथाएं क्या हैं?", a: "हम पर्यावरणीय प्रभाव को कम करने के लिए पर्यावरण-अनुकूल पैकेजिंग, अपशिष्ट कमी कार्यक्रम लागू करते हैं और टिकाऊ कृषि प्रथाओं का समर्थन करते हैं।" },
        { q: "क्या मैं व्यावसायिक साझेदार बन सकता हूं?", a: "हाँ, हम होटल, रेस्टोरेंट और रिटेलर्स के साथ साझेदारी का स्वागत करते हैं। साझेदारी के अवसरों और शर्तों पर चर्चा करने के लिए हमसे संपर्क करें।" },
        { q: "आपकी विस्तार योजनाएं क्या हैं?", a: "हम अगले 3 वर्षों में अपनी उत्पाद श्रृंखला का विस्तार करने, बाजार उपस्थिति बढ़ाने और पूरे भारत में अधिक वितरण केंद्र स्थापित करने की योजना बना रहे हैं।" }
      ],
    },
    cta: {
      heading: "क्या आप साझेदारी के लिए तैयार हैं?",
      subheading: "गुणवत्ता और समृद्धि की यात्रा में हमारे साथ जुड़ें।",
      primaryText: "निवेश के अवसर देखें",
      primaryHref: "/investments"
    },
    testimonials: {
      heading: "हमारे साझेदार क्या कहते हैं",
      subtitle: "हमारे मूल्यवान व्यावसायिक साझेदारों और ग्राहकों से सुनें",
      items: [
        {
          name: "राजेश कुमार",
          role: "होटल मैनेजर, ग्रैंड प्लाजा",
          text: "सरल नेचुरल्स ने लगातार उच्च गुणवत्ता वाले डेयरी उत्पाद वितरित किए हैं। उनकी विश्वसनीयता और ताजगी ने उन्हें हमारा पसंदीदा आपूर्तिकर्ता बना दिया है।"
        },
        {
          name: "प्रिया शर्मा",
          role: "रेस्टोरेंट मालिक, स्पाइस गार्डन",
          text: "उनके पनीर और दही की गुणवत्ता ने हमारे मेनू को काफी बेहतर बना दिया है। हमारे ग्राहक ताजगी और स्वाद से प्यार करते हैं।"
        },
        {
          name: "अमित पटेल",
          role: "कैंटीन मैनेजर, टेक पार्क",
          text: "उनकी डिलीवरी सेवा उत्कृष्ट है और उत्पाद हमेशा हमारी गुणवत्ता की अपेक्षाओं को पूरा करते हैं। अत्यधिक अनुशंसित!"
        }
      ]
    },
    news: {
      heading: "नवीनतम समाचार और अपडेट",
      subtitle: "हमारे नवीनतम विकास और उपलब्धियों के साथ अपडेट रहें",
      items: [
        {
          title: "सरल नेचुरल्स 50+ होटलों तक विस्तार",
          date: "अगस्त 2024",
          excerpt: "हमें घोषणा करते हुए गर्व हो रहा है कि हमारी साझेदारी क्षेत्र भर में 50+ प्रीमियम होटलों के साथ है, जो हमारी विकास यात्रा में एक महत्वपूर्ण मील का पत्थर है।"
        },
        {
          title: "नई उत्पाद श्रृंखला का शुभारंभ",
          date: "जुलाई 2024",
          excerpt: "बढ़ती बाजार मांगों को पूरा करने के लिए फ्लेवर्ड डेयरी उत्पादों और नवीन शाकाहारी विकल्पों की हमारी नई श्रृंखला का परिचय।"
        },
        {
          title: "गुणवत्ता प्रमाणपत्र प्राप्त",
          date: "जून 2024",
          excerpt: "सरल नेचुरल्स को ISO 22000 प्रमाणपत्र मिला है, जो खाद्य सुरक्षा और गुणवत्ता मानकों के प्रति हमारी प्रतिबद्धता की पुष्टि करता है।"
        }
      ]
    },
    team: {
      heading: "हमारी नेतृत्व टीम",
      subtitle: "सरल नेचुरल्स के पीछे के दूरदर्शियों से मिलें",
      members: [
        {
          name: "अरुण सिंह",
          role: "मुख्य कार्यकारी अधिकारी",
          bio: "डेयरी उद्योग में 15+ वर्षों के अनुभव के साथ, अरुण पूरे भारत में गुणवत्तापूर्ण उत्पाद पहुंचाने के हमारे मिशन का नेतृत्व करते हैं।"
        },
        {
          name: "मीरा कपूर",
          role: "मुख्य परिचालन अधिकारी",
          bio: "मीरा परिचालन उत्कृष्टता सुनिश्चित करती हैं और सभी सुविधाओं में हमारे उच्च गुणवत्ता मानकों को बनाए रखती हैं।"
        },
        {
          name: "विक्रम मल्होत्रा",
          role: "मुख्य वित्तीय अधिकारी",
          bio: "विक्रम हमारी वित्तीय रणनीति और निवेशक संबंधों का प्रबंधन करते हैं, स्थायी विकास सुनिश्चित करते हैं।"
        }
      ]
    },
    features: {
      heading: "सरल नेचुरल्स को क्यों चुनें",
      items: [
        {
          title: "प्रीमियम गुणवत्ता",
          description: "हर उत्पाद शुद्धता, स्वाद और ताजगी के उच्चतम मानकों को पूरा करता है गारंटीड गुणवत्ता आश्वासन के साथ।",
          icon: "star"
        },
        {
          title: "गारंटीड ताजगी",
          description: "खेत से टेबल तक, हम अपने कुशल आपूर्ति श्रृंखला और तेज़ डिलीवरी प्रणाली के साथ अधिकतम ताजगी सुनिश्चित करते हैं।",
          icon: "leaf"
        },
        {
          title: "व्यापक बाजार पहुंच",
          description: "शहरी सुविधा चाहने वालों और ग्रामीण समुदायों दोनों की समान समर्पण और गुणवत्ता मानकों के साथ सेवा।",
          icon: "map"
        },
        {
          title: "निरंतर नवाचार",
          description: "बाजार की जरूरतों और ग्राहक प्रतिक्रिया के आधार पर नए उत्पाद विकसित करना और मौजूदा लोगों में सुधार करना।",
          icon: "lightbulb"
        },
        {
          title: "टिकाऊ प्रथाएं",
          description: "पर्यावरण की रक्षा करते हुए गुणवत्तापूर्ण उत्पाद वितरित करने के लिए पर्यावरण-अनुकूल प्रथाएं।",
          icon: "recycle"
        },
        {
          title: "समुदाय फोकस",
          description: "रोजगार के अवसर और आर्थिक विकास पहलों के माध्यम से स्थानीय समुदायों में सकारात्मक प्रभाव पैदा करना।",
          icon: "users"
        }
      ]
    },
    certifications: {
      heading: "गुणवत्ता प्रमाणपत्र",
      items: [
        "ISO 22000:2018 - खाद्य सुरक्षा प्रबंधन",
        "FSSAI लाइसेंस - खाद्य सुरक्षा मानक",
        "HACCP प्रमाणपत्र - खतरा विश्लेषण",
        "GMP प्रमाणपत्र - अच्छी विनिर्माण प्रथाएं",
        "ऑर्गेनिक प्रमाणपत्र - प्राकृतिक उत्पाद"
      ]
    },
    sustainability: {
      heading: "हमारी स्थिरता प्रतिबद्धता",
      body: "सरल नेचुरल्स में, हम टिकाऊ व्यावसायिक प्रथाओं में विश्वास करते हैं जो हमारे ग्राहकों को गुणवत्तापूर्ण उत्पाद वितरित करते हुए हमारे पर्यावरण की रक्षा करते हैं।",
      practices: [
        "पर्यावरण-अनुकूल पैकेजिंग सामग्री",
        "अपशिष्ट कमी और पुनर्चक्रण कार्यक्रम",
        "ऊर्जा-कुशल उत्पादन प्रक्रियाएं",
        "टिकाऊ कृषि प्रथाओं का समर्थन",
        "जल संरक्षण पहल",
        "कार्बन फुटप्रिंट कमी कार्यक्रम"
      ]
    },
    contact: {
      phone: "+91 92134 14228",
      email: "saralnaturals@gmail.com",
      address: "गांधी नगर, बस्ती, उत्तर प्रदेश 272001",
      website: "https://www.saralnaturals.com",
    },
  },
};



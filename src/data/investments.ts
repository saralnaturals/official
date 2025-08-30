export type InvestmentScheme = {
  slug: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  highlights: { en: string[]; hi: string[] };
};

export const investmentSchemes: InvestmentScheme[] = [
  {
    slug: "scheme-a",
    title: {
      en: "Investment Scheme A",
      hi: "निवेश योजना A",
    },
    summary: {
      en: "A sustainable agriculture-focused scheme offering transparent timelines and community impact.",
      hi: "टिकाऊ कृषि केंद्रित योजना, पारदर्शी समयरेखा और सामुदायिक प्रभाव के साथ।",
    },
    highlights: {
      en: [
        "Transparent returns and timelines",
        "Sustainable agriculture focus",
        "Community-first initiatives",
      ],
      hi: [
        "पारदर्शी रिटर्न और समयरेखा",
        "टिकाऊ कृषि पर ध्यान",
        "समुदाय-प्रथम पहल",
      ],
    },
  },
];



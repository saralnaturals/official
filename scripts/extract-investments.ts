/*
  Script to extract text from English and Hindi PDFs and write structured JSON
  Usage: npx tsx scripts/extract-investments.ts
*/

import fs from "node:fs";
import path from "node:path";
import pdf from "pdf-parse";

type Extracted = {
  en: string;
  hi: string;
};

async function readPdf(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text.replace(/\s+$/g, "").trim();
}

async function main() {
  const root = path.resolve(__dirname, "..", "..");
  const base = path.resolve(root);
  // PDFs are one level up from project root
  const englishPdf = path.resolve(base, "Saral Naturals Investment Scheme.pdf");
  const hindiPdf = path.resolve(base, "Saral Naturals Investment Scheme Hindi.pdf");

  if (!fs.existsSync(englishPdf) || !fs.existsSync(hindiPdf)) {
    console.error("PDF files not found next to project folder. Skipping.");
    process.exit(1);
  }

  const [en, hi] = await Promise.all([readPdf(englishPdf), readPdf(hindiPdf)]);

  const outDir = path.resolve(root, "src", "data");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.resolve(outDir, "investment-content.json");

  const extracted: Extracted = { en, hi };
  fs.writeFileSync(outFile, JSON.stringify(extracted, null, 2), "utf-8");
  console.log("Wrote:", outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



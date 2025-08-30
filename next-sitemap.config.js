/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.saral-naturals.example',
  generateRobotsTxt: true,
  outDir: 'public',
};



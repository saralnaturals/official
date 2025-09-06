/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.saralnaturals.com',
  generateRobotsTxt: true,
  outDir: 'public',
};



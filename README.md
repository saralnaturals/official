# Saral Naturals Website

A modern, responsive website for Saral Naturals built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **🌐 Internationalization** - English and Hindi support with language persistence
- **🌙 Dark/Light Mode** - System preference detection with manual toggle
- **📱 Responsive Design** - Optimized for all devices (320px to desktop)
- **⚡ Performance** - Static generation, optimized images, and fast loading
- **🔍 SEO Optimized** - Complete metadata, sitemap, robots.txt, and schema markup
- **🎨 Modern UI** - Clean design with smooth animations and accessibility features

## 📋 Pages

- **Home** - Hero section, company highlights, products, markets, stats, FAQ, CTA
- **About** - Company overview and mission
- **Products** - Dairy and plant-based product showcase
- **Investments** - Investment schemes and opportunities (isolated for easy removal)
- **Contact** - Contact form with API integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Theming**: next-themes
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **SEO**: next-seo, next-sitemap

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saral-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
saral-site/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── investments/    # Investment pages (isolated)
│   │   └── ...
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utilities and configurations
│   │   ├── locales/       # i18n JSON files
│   │   └── ...
│   └── data/              # Static data and content
├── public/
│   ├── brand/             # Brand assets (SVG logos)
│   └── ...
└── scripts/               # Build and utility scripts
```

## 🌐 Internationalization

The website supports English and Hindi languages:

- **Language Selection**: Modal for first-time visitors
- **Language Toggle**: Header dropdown for existing users
- **Persistence**: Language preference saved in localStorage
- **Content**: All text content available in both languages

### Adding New Languages

1. Create new locale file in `src/lib/locales/`
2. Update `src/lib/i18n.tsx` to include the new language
3. Add language option to header dropdown

## 🎨 Theming

The website supports both light and dark modes:

- **System Preference**: Automatically detects user's system theme
- **Manual Toggle**: Header button to switch themes
- **Persistence**: Theme preference saved in localStorage
- **Brand Assets**: SVG logos adapt to theme changes

## 📱 Responsive Design

The website is fully responsive across all devices:

- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large Screens**: 1280px and up

## 🔍 SEO Features

- **Metadata**: Complete OpenGraph and Twitter cards
- **Sitemap**: Auto-generated XML sitemap
- **Robots**: robots.txt with proper directives
- **Schema**: Organization and page-specific structured data
- **Performance**: Optimized images and fast loading

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab
   - Connect repository to Vercel

2. **Environment Variables**
   ```env
   SITE_URL=https://your-domain.com
   ```

3. **Deploy**
   - Vercel will auto-deploy on push
   - Custom domain can be added in Vercel dashboard

### Other Platforms

The website can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and `npm run start`
- **Railway**: Direct deployment from GitHub
- **AWS/GCP**: Container deployment with Docker

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Site Configuration
SITE_URL=https://your-domain.com

# Contact Form (Optional)
GOOGLE_SHEETS_WEBHOOK=https://your-webhook-url.com
```

### Customization

- **Brand Assets**: Replace SVGs in `public/brand/`
- **Content**: Update JSON files in `src/lib/locales/` and `src/data/`
- **Styling**: Modify Tailwind classes or add custom CSS
- **Contact Form**: Update webhook URL in `src/app/api/contact/route.ts`

## 📊 Performance

- **First Load JS**: ~152KB
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Analysis**: Available via `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Saral Naturals.

## 📞 Support

For questions or support, contact:
- Email: saralnaturals@gmail.com
- Phone: +91 92134 14228

---

Built with ❤️ for Saral Naturals

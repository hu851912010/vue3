# My Creative Space — Vue 3 Static Blog

A bilingual personal blog and portfolio built with Vue 3, Vite, and Tailwind CSS. Articles are written in Markdown, projects are stored as JSON, and the site ships ready-to-host as a static bundle.

## ✨ Features

- Landing page highlighting featured projects and recent articles
- Markdown-powered articles with code formatting, tags, and previous/next navigation
- Project directory with filters and detailed views for every tool or web game
- Dedicated pages for About and Contact (with placeholder email form)
- Bilingual interface (English / 中文) powered by a lightweight Pinia store
- RSS feed and sitemap generation from static content
- Tailwind CSS theme following the provided dark aesthetic guidelines

## 📁 Content structure

```text
src/
  data/
    articles/        # Markdown files with front matter metadata
    projects.json    # Project definitions
  components/        # UI components (cards, layout, navigation)
  views/             # Route views
  utils/             # Markdown + front matter utilities
  composables/       # Translations helper
```

## 🛠️ Development

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # build for production
npm run preview    # preview the production build
npm run generate   # regenerate rss.xml and sitemap.xml from markdown content
```

> **Tip:** Run `npm run generate` whenever you add or update Markdown files so the RSS feed and sitemap stay in sync.

## 📄 License

MIT © 2025

---
id: "1"
slug: "building-a-vue3-static-blog"
title:
  en: "Building a Vue 3 Static Blog"
  zh: "用 Vue 3 打造静态博客"
summary:
  en: "Foundations, content workflow, and deployment tips for a bilingual static site."
  zh: "搭建双语静态站点的基础架构、内容流程与部署心得。"
publishedAt: "2024-04-02"
tags: ["vue3", "workflow", "design"]
featured: true
---

## Design the reading experience first

I begin every web project by designing the reading experience. Clear rhythm, consistent spacing, and purposeful typography make even the simplest layout feel premium.

- Define your color palette early so design accents stay consistent.
- Use a modular scale for headings to create hierarchy.
- Reserve breathing room around important call-to-action sections.

## Content pipeline for Markdown lovers

Writing with Markdown keeps me focused on words. A lightweight pipeline is often enough:

1. Draft ideas in Obsidian or iA Writer.
2. Export to the repository once the story feels complete.
3. Automate feed generation so readers always get the latest updates.

```js
const modules = import.meta.glob('./articles/*.md', { eager: true, as: 'raw' });
const articles = Object.values(modules).map(parseMarkdownFile);
```

## Deployment checklist

> A polished indie project is less about scale, more about care.

- Generate RSS & sitemap before every release.
- Compress hero imagery and prefer modern formats.
- Add a staging build to test language fallbacks.

Hope these notes help you build a calm reading space of your own.

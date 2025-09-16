import { parseFrontMatter } from '@/utils/frontmatter';
import { renderMarkdown } from '@/utils/markdown';

const modules = import.meta.glob('./*.md', { eager: true, as: 'raw' });

function estimateReadingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return minutes;
}

const articles = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontMatter(raw);
    const publishedAt = data.publishedAt || new Date().toISOString().slice(0, 10);
    const publishedDate = new Date(publishedAt);
    return {
      ...data,
      slug: data.slug,
      publishedAt,
      publishedDate,
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
      summary: data.summary || {},
      title: data.title || {},
      body: content,
      html: renderMarkdown(content),
      readingTime: estimateReadingTime(content),
      sourcePath: path
    };
  })
  .sort((a, b) => b.publishedDate - a.publishedDate);

export function getArticles() {
  return articles;
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getAdjacentArticles(slug) {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  const previous = index < articles.length - 1 ? articles[index + 1] : null;
  const next = index > 0 ? articles[index - 1] : null;
  return { previous, next };
}

export default articles;

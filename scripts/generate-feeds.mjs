import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontMatter } from '../src/utils/frontmatter.js';
import { renderMarkdown } from '../src/utils/markdown.js';
import projects from '../src/data/projects.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const site = {
  url: 'https://example.com',
  title: 'My Creative Space',
  description: 'A bilingual personal blog about front-end craft and playful projects.'
};

async function loadArticles() {
  const articlesDir = join(__dirname, '../src/data/articles');
  const entries = await fs.readdir(articlesDir);
  const articles = [];
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const filePath = join(articlesDir, entry);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = parseFrontMatter(raw);
    const html = renderMarkdown(content);
    articles.push({
      ...data,
      summary: data.summary?.en ?? '',
      html,
      publishedAt: data.publishedAt,
      slug: data.slug
    });
  }
  return articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function buildRss(articles) {
  const items = articles
    .map((article) => `    <item>
      <title><![CDATA[${article.title?.en ?? article.title}]]></title>
      <link>${site.url}/articles/${article.slug}</link>
      <guid>${site.url}/articles/${article.slug}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${article.html}]]></content:encoded>
    </item>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${site.title}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
}

function buildSitemap(articles) {
  const staticPages = ['/', '/articles', '/projects', '/about', '/contact'];
  const articleUrls = articles.map((article) => `/articles/${article.slug}`);
  const projectUrls = projects.map((project) => `/projects/${project.id}`);
  const urls = [...staticPages, ...articleUrls, ...projectUrls];

  const entries = urls
    .map((path) => `  <url>
    <loc>${site.url}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

async function ensurePublicDir() {
  const publicDir = join(__dirname, '../public');
  await fs.mkdir(publicDir, { recursive: true });
  return publicDir;
}

async function main() {
  const articles = await loadArticles();
  const publicDir = await ensurePublicDir();
  const rss = buildRss(articles);
  const sitemap = buildSitemap(articles);

  await fs.writeFile(join(publicDir, 'rss.xml'), rss, 'utf-8');
  await fs.writeFile(join(publicDir, 'sitemap.xml'), sitemap, 'utf-8');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

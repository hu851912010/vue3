<template>
  <footer class="border-t border-white/10 bg-background/80">
    <div class="container-wide grid gap-10 py-16 md:grid-cols-2">
      <div class="flex flex-col gap-4">
        <h3 class="text-2xl font-semibold text-white/90">{{ t('site.title') }}</h3>
        <p class="max-w-xl text-sm text-textSecondary">{{ t('site.description') }}</p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a
            v-for="link in socials"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-textSecondary transition hover:border-white/30 hover:text-textPrimary"
          >
            <span class="text-lg">{{ link.icon }}</span>
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
      <div class="grid gap-8 sm:grid-cols-2">
        <div>
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">{{ t('nav.articles') }}</h4>
          <ul class="space-y-2 text-sm text-textSecondary">
            <li><RouterLink to="/articles" class="hover:text-textPrimary">{{ t('articles.pageTitle') }}</RouterLink></li>
            <li><RouterLink to="/projects" class="hover:text-textPrimary">{{ t('nav.projects') }}</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-textPrimary">{{ t('nav.about') }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">Resources</h4>
          <ul class="space-y-2 text-sm text-textSecondary">
            <li><a href="/rss.xml" class="hover:text-textPrimary">{{ t('footer.rss') }}</a></li>
            <li><a href="/sitemap.xml" class="hover:text-textPrimary">{{ t('footer.sitemap') }}</a></li>
            <li><a href="mailto:hello@example.com" class="hover:text-textPrimary">hello@example.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gradient-divider"></div>
    <div class="container-wide flex flex-col gap-3 py-6 text-xs text-textSecondary sm:flex-row sm:items-center sm:justify-between">
      <span>{{ t('footer.rights') }}</span>
      <span>Made with Vue 3 · Tailwind CSS · Static Markdown</span>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useTranslations } from '@/composables/useTranslations';

const { t } = useTranslations();

const socials = [
  { label: 'GitHub', url: 'https://github.com/example', icon: '🐙' },
  { label: 'Twitter', url: 'https://twitter.com/example', icon: '🐦' },
  { label: 'Email', url: 'mailto:hello@example.com', icon: '✉️' }
];
</script>

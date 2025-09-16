<template>
  <section class="section-padding">
    <div class="container-wide mx-auto max-w-4xl space-y-12">
      <div v-if="article" class="space-y-8">
        <div class="space-y-4">
          <RouterLink
            to="/articles"
            class="inline-flex items-center gap-2 text-sm font-semibold text-textSecondary hover:text-accent"
          >
            ← {{ t('article.backToList') }}
          </RouterLink>
          <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-sm text-textSecondary">
            <span>{{ publishedLabel }}</span>
            <span>•</span>
            <span>{{ readingLabel }}</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <TagPill v-for="tag in article.tags" :key="tag">#{{ tag }}</TagPill>
          </div>
        </div>
        <article class="prose-content space-y-6 text-base" v-html="article.html"></article>
      </div>
      <div v-else class="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-textSecondary">
        Article not found.
      </div>

      <div v-if="adjacent.previous || adjacent.next" class="grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-if="adjacent.previous"
          :to="`/articles/${adjacent.previous.slug}`"
          class="group flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10"
        >
          <span class="text-xs uppercase tracking-wide text-textSecondary">{{ t('article.previous') }}</span>
          <span class="text-base font-semibold text-white transition group-hover:text-accent">
            {{ localize(adjacent.previous.title) }}
          </span>
        </RouterLink>
        <RouterLink
          v-if="adjacent.next"
          :to="`/articles/${adjacent.next.slug}`"
          class="group flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10 text-right"
        >
          <span class="text-xs uppercase tracking-wide text-textSecondary">{{ t('article.next') }}</span>
          <span class="text-base font-semibold text-white transition group-hover:text-accent">
            {{ localize(adjacent.next.title) }}
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useTranslations } from '@/composables/useTranslations';
import { getArticleBySlug, getAdjacentArticles } from '@/data/articles';
import TagPill from '@/components/TagPill.vue';

const route = useRoute();
const { t, localize, locale } = useTranslations();

const article = computed(() => getArticleBySlug(route.params.slug));
const adjacent = computed(() => getAdjacentArticles(route.params.slug));

const title = computed(() => (article.value ? localize(article.value.title) : ''));

const publishedLabel = computed(() => {
  if (!article.value) return '';
  const formatter = new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return `${t('article.publishedOn')} ${formatter.format(article.value.publishedDate)}`;
});

const readingLabel = computed(() => {
  if (!article.value) return '';
  const minutes = article.value.readingTime;
  return locale.value === 'zh' ? `${minutes} 分钟阅读` : `${minutes} min read`;
});
</script>

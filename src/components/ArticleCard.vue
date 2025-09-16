<template>
  <RouterLink
    :to="`/articles/${article.slug}`"
    class="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_15px_45px_rgba(96,165,250,0.15)]"
  >
    <div class="flex items-center justify-between text-xs uppercase tracking-wide text-textSecondary">
      <span>{{ publishedLabel }}</span>
      <span>{{ readingLabel }}</span>
    </div>
    <h3 class="text-xl font-semibold text-white transition group-hover:text-accent">
      {{ title }}
    </h3>
    <p class="text-sm leading-relaxed text-textSecondary">
      {{ summary }}
    </p>
    <div class="flex flex-wrap gap-2">
      <TagPill v-for="tag in article.tags" :key="tag">#{{ tag }}</TagPill>
    </div>
    <span class="text-sm font-semibold text-accent">
      {{ t('actions.readArticle') }} →
    </span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import TagPill from '@/components/TagPill.vue';
import { useTranslations } from '@/composables/useTranslations';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const { locale, t, localize } = useTranslations();

const title = computed(() => localize(props.article.title));
const summary = computed(() => localize(props.article.summary));

const publishedLabel = computed(() => {
  const formatter = new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return formatter.format(props.article.publishedDate);
});

const readingLabel = computed(() => {
  const minutes = props.article.readingTime;
  return locale.value === 'zh' ? `${minutes} 分钟阅读` : `${minutes} min read`;
});
</script>

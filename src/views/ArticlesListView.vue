<template>
  <section class="section-padding">
    <div class="container-wide space-y-12">
      <header class="space-y-4">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">{{ t('articles.pageTitle') }}</p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">{{ t('articles.pageTitle') }}</h1>
        <p class="max-w-2xl text-base text-textSecondary">
          {{ t('articles.intro') }}
        </p>
      </header>

      <div v-if="paginatedArticles.length" class="space-y-12">
        <div class="grid gap-6 md:grid-cols-2">
          <ArticleCard v-for="article in paginatedArticles" :key="article.id" :article="article" />
        </div>
        <PaginationControls
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="updatePage"
        />
      </div>
      <div v-else class="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-textSecondary">
        {{ t('articles.empty') }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleCard from '@/components/ArticleCard.vue';
import PaginationControls from '@/components/PaginationControls.vue';
import { useTranslations } from '@/composables/useTranslations';
import articles from '@/data/articles';

const { t } = useTranslations();
const route = useRoute();
const router = useRouter();
const pageSize = 4;

const currentPage = ref(Number.parseInt(route.query.page, 10) || 1);

watch(
  () => route.query.page,
  (value) => {
    const parsed = Number.parseInt(value, 10);
    currentPage.value = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }
);

const totalPages = computed(() => Math.max(1, Math.ceil(articles.length / pageSize)));

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return articles.slice(start, start + pageSize);
});

function updatePage(page) {
  const target = Math.min(Math.max(page, 1), totalPages.value);
  router.replace({ query: { ...route.query, page: target } });
}
</script>

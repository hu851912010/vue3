<template>
  <section class="section-padding">
    <div class="container-wide space-y-16">
      <div class="card-surface relative overflow-hidden px-8 py-12 sm:px-12">
        <div class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/20 to-transparent opacity-60 blur-3xl"></div>
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-xl space-y-6">
            <p class="text-sm font-semibold uppercase tracking-widest text-accent">{{ t('nav.home') }}</p>
            <h1 class="text-4xl font-bold text-white">{{ t('site.title') }}</h1>
            <p class="text-base text-textSecondary">{{ t('home.greeting') }}</p>
            <div class="flex flex-wrap gap-3">
              <RouterLink
                to="/projects"
                class="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
              >
                {{ t('nav.projects') }}
              </RouterLink>
              <RouterLink
                to="/articles"
                class="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-textSecondary transition hover:border-white/40 hover:text-textPrimary"
              >
                {{ t('nav.articles') }}
              </RouterLink>
            </div>
          </div>
          <div class="grid w-full max-w-sm gap-4">
            <div class="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-textSecondary shadow-[0_20px_50px_rgba(15,18,22,0.65)]">
              <h3 class="mb-3 text-lg font-semibold text-white">{{ t('home.featuredProjects') }}</h3>
              <div class="space-y-4">
                <div v-if="featuredTool" class="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-wide text-textSecondary">{{ t('home.tools') }}</p>
                  <RouterLink :to="`/projects/${featuredTool.id}`" class="text-base font-semibold text-white hover:text-accent">
                    {{ localize(featuredTool.title) }}
                  </RouterLink>
                  <p class="mt-2 text-xs text-textSecondary">{{ localize(featuredTool.summary) }}</p>
                </div>
                <div v-if="featuredGame" class="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-wide text-textSecondary">{{ t('home.games') }}</p>
                  <RouterLink :to="`/projects/${featuredGame.id}`" class="text-base font-semibold text-white hover:text-accent">
                    {{ localize(featuredGame.title) }}
                  </RouterLink>
                  <p class="mt-2 text-xs text-textSecondary">{{ localize(featuredGame.summary) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-white">{{ t('home.latestArticles') }}</h2>
          <RouterLink to="/articles" class="text-sm font-semibold text-accent hover:text-accent/80">
            {{ t('actions.viewAll') }}
          </RouterLink>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <ArticleCard v-for="article in latestArticles" :key="article.id" :article="article" />
        </div>
      </section>

      <section class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-white">{{ t('home.latestProjects') }}</h2>
          <RouterLink to="/projects" class="text-sm font-semibold text-accent hover:text-accent/80">
            {{ t('actions.viewAll') }}
          </RouterLink>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in latestProjects" :key="project.id" :project="project" />
        </div>
        <RouterLink to="/projects" class="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80">
          {{ t('home.moreProjects') }}
        </RouterLink>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import ArticleCard from '@/components/ArticleCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { useTranslations } from '@/composables/useTranslations';
import articles from '@/data/articles';
import projects from '@/data/projects.json';

const { t, localize } = useTranslations();

const latestArticles = computed(() => articles.slice(0, 3));
const sortedProjects = computed(() =>
  [...projects].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
);
const latestProjects = computed(() => sortedProjects.value.slice(0, 3));

const featuredTool = computed(() => sortedProjects.value.find((project) => project.type === 'tool' && project.featured));
const featuredGame = computed(() => sortedProjects.value.find((project) => project.type === 'game' && project.featured));
</script>

<template>
  <section class="section-padding">
    <div class="container-wide mx-auto max-w-5xl space-y-12">
      <div v-if="project" class="space-y-8">
        <RouterLink to="/projects" class="inline-flex items-center gap-2 text-sm font-semibold text-textSecondary hover:text-accent">
          ← {{ t('projects.pageTitle') }}
        </RouterLink>
        <header class="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10">
          <div class="flex flex-wrap items-center gap-4 text-sm text-textSecondary">
            <TagPill>{{ typeLabel }}</TagPill>
            <span>•</span>
            <span>{{ launchedLabel }}</span>
          </div>
          <h1 class="text-4xl font-bold text-white">{{ title }}</h1>
          <p class="max-w-3xl text-base text-textSecondary">{{ summary }}</p>
          <div class="flex flex-wrap gap-3">
            <a
              :href="project.demoUrl"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              {{ t('actions.viewDemo') }}
            </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-textSecondary transition hover:border-white/35 hover:text-textPrimary"
            >
              {{ t('actions.viewRepo') }}
            </a>
          </div>
        </header>
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
            <h2 class="mb-4 text-xl font-semibold text-white">{{ t('projects.projectType') }}</h2>
            <p class="text-sm leading-relaxed text-textSecondary">{{ description }}</p>
          </div>
          <div class="space-y-6">
            <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 class="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">{{ t('projects.techStack') }}</h3>
              <ul class="flex flex-wrap gap-2 text-sm text-textSecondary">
                <li
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {{ tech }}
                </li>
              </ul>
            </div>
            <div class="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-textSecondary">
              <h3 class="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">{{ t('projects.launched') }}</h3>
              <p>{{ launchedLabel }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-textSecondary">
        Project not found.
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useTranslations } from '@/composables/useTranslations';
import projects from '@/data/projects.json';
import TagPill from '@/components/TagPill.vue';

const route = useRoute();
const { t, localize, locale } = useTranslations();

const project = computed(() => projects.find((item) => item.id === route.params.id));

const title = computed(() => (project.value ? localize(project.value.title) : ''));
const summary = computed(() => (project.value ? localize(project.value.summary) : ''));
const description = computed(() => (project.value ? localize(project.value.description) : ''));

const typeLabel = computed(() => {
  if (!project.value) return '';
  if (project.value.type === 'tool') {
    return t('projects.filters.tools');
  }
  if (project.value.type === 'game') {
    return t('projects.filters.games');
  }
  return project.value.type;
});

const launchedLabel = computed(() => {
  if (!project.value) return '';
  const formatter = new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long'
  });
  return formatter.format(new Date(project.value.publishedAt));
});
</script>

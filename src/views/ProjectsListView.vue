<template>
  <section class="section-padding">
    <div class="container-wide space-y-12">
      <header class="space-y-4">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">{{ t('projects.pageTitle') }}</p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">{{ t('projects.pageTitle') }}</h1>
        <p class="max-w-2xl text-base text-textSecondary">
          {{ t('projects.intro') }}
        </p>
      </header>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="option in filters"
          :key="option.value"
          type="button"
          class="rounded-full border px-5 py-2 text-sm font-semibold transition"
          :class="
            option.value === selectedFilter
              ? 'border-transparent bg-accent text-white shadow-glow'
              : 'border-white/15 bg-white/5 text-textSecondary hover:border-white/35 hover:text-textPrimary'
          "
          @click="selectedFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in visibleProjects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { useTranslations } from '@/composables/useTranslations';
import projects from '@/data/projects.json';

const { t } = useTranslations();

const filters = computed(() => [
  { value: 'all', label: t('projects.filters.all') },
  { value: 'tool', label: t('projects.filters.tools') },
  { value: 'game', label: t('projects.filters.games') }
]);

const selectedFilter = ref('all');

const sortedProjects = computed(() =>
  [...projects].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
);

const visibleProjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return sortedProjects.value;
  }
  return sortedProjects.value.filter((project) => project.type === selectedFilter.value);
});
</script>

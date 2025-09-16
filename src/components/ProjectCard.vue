<template>
  <RouterLink
    :to="`/projects/${project.id}`"
    class="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(96,165,250,0.18)]"
  >
    <div class="flex items-center justify-between text-xs uppercase tracking-wider text-textSecondary">
      <span>{{ typeLabel }}</span>
      <span>{{ launchedLabel }}</span>
    </div>
    <h3 class="text-xl font-semibold text-white transition group-hover:text-accent">
      {{ title }}
    </h3>
    <p class="text-sm leading-relaxed text-textSecondary">
      {{ summary }}
    </p>
    <div class="flex flex-wrap gap-2 text-xs text-textSecondary">
      <span
        v-for="tech in project.techStack"
        :key="tech"
        class="rounded-full border border-white/10 bg-white/5 px-3 py-1"
      >
        {{ tech }}
      </span>
    </div>
    <span class="text-sm font-semibold text-accent">
      {{ t('actions.viewProject') }} →
    </span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useTranslations } from '@/composables/useTranslations';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const { locale, t, localize } = useTranslations();

const typeLabel = computed(() => {
  if (props.project.type === 'tool') {
    return t('projects.filters.tools');
  }
  if (props.project.type === 'game') {
    return t('projects.filters.games');
  }
  return props.project.type;
});

const title = computed(() => localize(props.project.title));
const summary = computed(() => localize(props.project.summary));

const launchedLabel = computed(() => {
  const formatter = new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short'
  });
  return formatter.format(new Date(props.project.publishedAt));
});
</script>

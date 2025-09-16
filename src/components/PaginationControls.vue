<template>
  <div v-if="totalPages > 1" class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
    <button
      type="button"
      class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textSecondary transition hover:border-white/30 hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      ← {{ previousLabel }}
    </button>
    <div class="flex items-center gap-2 text-sm text-textSecondary">
      <span v-for="page in pages" :key="page">
        <button
          type="button"
          class="h-10 w-10 rounded-full border px-3 py-1 text-sm font-semibold transition"
          :class="
            page === currentPage
              ? 'border-transparent bg-accent text-white shadow-glow'
              : 'border-white/10 bg-white/5 text-textSecondary hover:border-white/30 hover:text-textPrimary'
          "
          @click="$emit('update:page', page)"
        >
          {{ page }}
        </button>
      </span>
    </div>
    <button
      type="button"
      class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-textSecondary transition hover:border-white/30 hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      {{ nextLabel }} →
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTranslations } from '@/composables/useTranslations';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

defineEmits(['update:page']);

const { t, locale } = useTranslations();

const pages = computed(() => {
  return Array.from({ length: props.totalPages }, (_, index) => index + 1);
});

const previousLabel = computed(() => (locale.value === 'zh' ? '上一页' : t('article.previous')));
const nextLabel = computed(() => (locale.value === 'zh' ? '下一页' : t('article.next')));
</script>

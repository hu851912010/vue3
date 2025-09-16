<template>
  <div class="flex items-center gap-2 rounded-full bg-white/5 p-1">
    <button
      v-for="option in availableLocales"
      :key="option.code"
      type="button"
      class="px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200 rounded-full border"
      :class="
        option.code === locale.value
          ? 'bg-accent text-white border-transparent shadow-glow'
          : 'bg-transparent text-textSecondary border-white/10 hover:border-white/30 hover:text-textPrimary'
      "
      :aria-pressed="option.code === locale.value"
      @click="switchLocale(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations';

const { locale, setLocale, availableLocales } = useTranslations();

const switchLocale = (code) => {
  if (code !== locale.value) {
    setLocale(code);
  }
};
</script>

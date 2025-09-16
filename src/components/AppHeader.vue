<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
    <div class="container-wide flex h-16 items-center justify-between">
      <RouterLink to="/" class="group flex items-center gap-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-accent transition group-hover:bg-accent group-hover:text-white"
        >
          λ
        </div>
        <div class="hidden flex-col leading-tight sm:flex">
          <span class="text-sm font-semibold text-white/90">{{ t('site.title') }}</span>
          <span class="text-xs text-textSecondary">Design · Code · Play</span>
        </div>
      </RouterLink>
      <nav class="hidden items-center gap-8 md:flex">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'text-accent'
              : 'text-textSecondary hover:text-textPrimary'
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="flex items-center gap-4">
        <LanguageSwitch />
        <button
          type="button"
          class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-textSecondary transition hover:border-white/20 hover:text-textPrimary"
          @click="isOpen = !isOpen"
          :aria-expanded="isOpen"
          aria-label="Toggle navigation"
        >
          <span v-if="!isOpen" class="text-lg">☰</span>
          <span v-else class="text-lg">×</span>
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <div class="container-wide flex flex-col gap-3 py-4">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="rounded-xl px-4 py-3 text-base font-medium text-textSecondary transition hover:bg-white/5 hover:text-textPrimary"
            @click="isOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import LanguageSwitch from '@/components/LanguageSwitch.vue';
import { useTranslations } from '@/composables/useTranslations';

const isOpen = ref(false);
const route = useRoute();
const { t } = useTranslations();

const navigation = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/articles', label: t('nav.articles') },
  { to: '/projects', label: t('nav.projects') },
  { to: '/about', label: t('nav.about') },
  { to: '/contact', label: t('nav.contact') }
]);

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path === path || route.path.startsWith(`${path}/`);
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      <div class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-accent/20 to-transparent blur-3xl opacity-70"></div>
    </div>
    <AppHeader />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

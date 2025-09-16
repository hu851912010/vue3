<template>
  <section class="section-padding">
    <div class="container-wide space-y-12">
      <header class="space-y-4">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">{{ t('about.pageTitle') }}</p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">{{ t('about.pageTitle') }}</h1>
        <p class="max-w-2xl text-base text-textSecondary">{{ t('about.subtitle') }}</p>
      </header>

      <div class="grid gap-8 lg:grid-cols-3">
        <div class="card-surface lg:col-span-2">
          <div class="space-y-6 p-8">
            <h2 class="text-2xl font-semibold text-white">Journey</h2>
            <p class="text-base leading-relaxed text-textSecondary">
              {{ introParagraph }}
            </p>
            <p class="text-base leading-relaxed text-textSecondary">
              {{ craftParagraph }}
            </p>
            <p class="text-base leading-relaxed text-textSecondary">
              {{ learningParagraph }}
            </p>
          </div>
        </div>
        <div class="card-surface p-8">
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">{{ t('about.experienceTitle') }}</h3>
          <ul class="space-y-4 text-sm text-textSecondary">
            <li v-for="item in snapshot" :key="item.title">
              <p class="text-xs uppercase tracking-widest text-white/50">{{ item.title }}</p>
              <p class="text-base text-textPrimary">{{ item.value }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-white">{{ t('about.valuesTitle') }}</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="value in values"
            :key="value.title"
            class="card-surface p-8"
          >
            <h3 class="text-lg font-semibold text-white">{{ value.title }}</h3>
            <p class="mt-3 text-sm text-textSecondary">{{ value.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useTranslations } from '@/composables/useTranslations';

const { t, locale } = useTranslations();

const introParagraph = computed(() =>
  locale.value === 'zh'
    ? '从交互设计起步，如今专注于前端工程和产品体验。我喜欢把复杂的想法拆解成更柔和、好理解的界面，让人们在使用时感到安心。'
    : 'I started as an interaction designer and gradually moved deeper into front-end engineering. My favourite work happens when complex ideas are translated into calm, approachable interfaces.'
);

const craftParagraph = computed(() =>
  locale.value === 'zh'
    ? '多年来，我为生产力工具、创意软件以及教育产品构建体验。每一次上线都提醒我：易用性来自系统化思考与细致的状态管理。'
    : 'Over the past years I have crafted experiences for productivity tools, creative software, and education platforms. Shipping consistently taught me that usability grows from systematic thinking and attentive state management.'
);

const learningParagraph = computed(() =>
  locale.value === 'zh'
    ? '工作之外，我热衷于写作、做音乐和制作小游戏。这些副项目让我持续练习表达，也让我拥抱好奇心。'
    : 'Outside of work I write essays, produce ambient music, and build playful web experiments. Side projects keep me curious and sharpen my ability to tell stories.'
);

const snapshot = computed(() =>
  locale.value === 'zh'
    ? [
        { title: '角色', value: '前端工程师 / 产品设计师' },
        { title: '关注方向', value: '创意工具 · 生产力 · 独立开发' },
        { title: '近况', value: '探索 AI 辅助创作工作流' },
        { title: '城市', value: '上海 / 远程协作' }
      ]
    : [
        { title: 'Role', value: 'Front-end engineer · Product designer' },
        { title: 'Focus', value: 'Creative tooling · Productivity · Indie making' },
        { title: 'Currently', value: 'Exploring AI-augmented creative flows' },
        { title: 'Based in', value: 'Shanghai · Remote friendly' }
      ]
);

const values = computed(() =>
  locale.value === 'zh'
    ? [
        {
          title: '同理心优先',
          body: '站在使用者的角度思考，不只关注结果，也关注过程中的情绪体验。'
        },
        {
          title: '保持好奇',
          body: '在日常里寻找新灵感，让实验精神驱动产品迭代。'
        },
        {
          title: '系统化视角',
          body: '通过设计系统与工程规范保证一致性，释放团队的创造力。'
        },
        {
          title: '长期主义',
          body: '拥抱慢慢打磨的节奏，积累出经得起时间考验的作品。'
        }
      ]
    : [
        {
          title: 'Lead with empathy',
          body: 'Design for how people feel during the journey, not just the endpoint metrics.'
        },
        {
          title: 'Stay curious',
          body: 'Prototype relentlessly and let playful experiments inform real product bets.'
        },
        {
          title: 'Think in systems',
          body: 'Craft design systems and engineering conventions that unlock focus and clarity.'
        },
        {
          title: 'Play the long game',
          body: 'Great products are layered over time. Patience keeps the craft honest.'
        }
      ]
);
</script>

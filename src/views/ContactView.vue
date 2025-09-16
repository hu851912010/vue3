<template>
  <section class="section-padding">
    <div class="container-wide space-y-12">
      <header class="space-y-4">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">{{ t('contact.pageTitle') }}</p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">{{ t('contact.pageTitle') }}</h1>
        <p class="max-w-2xl text-base text-textSecondary">{{ t('contact.intro') }}</p>
      </header>

      <div class="grid gap-8 lg:grid-cols-2">
        <div class="card-surface p-8 space-y-4">
          <h2 class="text-2xl font-semibold text-white">{{ t('contact.pageTitle') }}</h2>
          <p class="text-sm leading-relaxed text-textSecondary">
            {{ locale.value === 'zh'
              ? '倾听是合作的开始。如果你有想法、问题或建议，欢迎随时发邮件给我：'
              : 'Listening is the first step to meaningful collaboration. Drop a note anytime:' }}
            <a href="mailto:hello@example.com" class="text-accent hover:text-accent/80">hello@example.com</a>
          </p>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-textSecondary">
            <p class="font-semibold text-white/80">Response time</p>
            <p class="mt-2">{{ locale.value === 'zh' ? '通常会在 48 小时内回复所有邮件。' : 'I usually reply within 48 hours.' }}</p>
          </div>
        </div>
        <form class="card-surface p-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <label for="email" class="text-sm font-semibold text-white/80">{{ t('contact.emailLabel') }}</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-textPrimary placeholder:text-white/30 focus:border-accent/60"
              placeholder="you@example.com"
            />
          </div>
          <div class="space-y-2">
            <label for="subject" class="text-sm font-semibold text-white/80">{{ t('contact.subjectLabel') }}</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              required
              class="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-textPrimary placeholder:text-white/30 focus:border-accent/60"
              :placeholder="locale.value === 'zh' ? '想聊些什么？' : 'What would you like to chat about?'"
            />
          </div>
          <div class="space-y-2">
            <label for="message" class="text-sm font-semibold text-white/80">{{ t('contact.messageLabel') }}</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              required
              class="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-textPrimary placeholder:text-white/30 focus:border-accent/60"
              :placeholder="locale.value === 'zh' ? '分享你的故事或需求…' : 'Share your story or request…'"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
          >
            {{ t('contact.submit') }}
          </button>
          <p v-if="submitted" class="text-sm text-accent">
            {{ locale.value === 'zh' ? '感谢留言！目前为占位表单，请直接发送邮件联系我。' : 'Thanks for reaching out! This is a placeholder form—please send an email instead.' }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useTranslations } from '@/composables/useTranslations';

const { t, locale } = useTranslations();

const form = reactive({
  email: '',
  subject: '',
  message: ''
});

const submitted = ref(false);

function handleSubmit() {
  submitted.value = true;
}
</script>

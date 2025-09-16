import { defineStore } from 'pinia';

function detectLocale() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('locale');
    if (stored) {
      return stored;
    }
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.startsWith('zh') ? 'zh' : 'en';
  }
  return 'en';
}

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: detectLocale()
  }),
  actions: {
    setLocale(locale) {
      this.locale = locale;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('locale', locale);
      }
    }
  }
});

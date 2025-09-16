import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '@/stores/language';
import messages from '@/i18n/messages';

function resolveMessage(key, locale) {
  const segments = key.split('.');
  let current = messages;
  for (const segment of segments) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    current = current[segment];
  }
  if (current === undefined || current === null) {
    return undefined;
  }
  if (typeof current === 'string') {
    return current;
  }
  if (typeof current === 'object') {
    return current[locale] ?? current.en ?? Object.values(current)[0];
  }
  return undefined;
}

function resolveLocalizedValue(value, locale) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] ?? value.en ?? Object.values(value)[0] ?? '';
  }
  return value;
}

export function useTranslations() {
  const languageStore = useLanguageStore();
  const { locale } = storeToRefs(languageStore);

  const t = (key) => resolveMessage(key, locale.value) ?? key;
  const localize = (value) => resolveLocalizedValue(value, locale.value);

  const availableLocales = computed(() => [
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' }
  ]);

  return {
    locale,
    t,
    localize,
    setLocale: languageStore.setLocale,
    availableLocales
  };
}

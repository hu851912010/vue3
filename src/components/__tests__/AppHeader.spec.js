import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeader from '../AppHeader.vue';

vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/'
  }),
  RouterLink: {
    name: 'RouterLink',
    props: ['to'],
    template: '<a :href="to"><slot /></a>'
  }
}));

vi.mock('@/components/LanguageSwitch.vue', () => ({
  default: {
    name: 'LanguageSwitch',
    template: '<div class="language-switch" />'
  }
}));

vi.mock('@/composables/useTranslations', () => {
  const translations = {
    'site.title': 'My Site',
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact'
  };

  return {
    useTranslations: () => ({
      t: (key) => translations[key] ?? key,
      localize: vi.fn(),
      setLocale: vi.fn(),
      locale: { value: 'en' },
      availableLocales: []
    })
  };
});

describe('AppHeader', () => {
  it('renders the site title', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.text()).toContain('My Site');
  });
});

import { createI18n } from 'vue-i18n';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY } from '../lib/theme';
import { useThemeStore } from '../store/theme.store';
import ThemeToggle from './ThemeToggle.vue';

function mockPrefersDark(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function mountToggle() {
  const pinia = createPinia();
  setActivePinia(pinia);
  useThemeStore().hydrate();
  const i18n = createI18n({
    legacy: false,
    locale: 'fa',
    missing: (_locale, key) => key,
    messages: { fa: {} },
  });

  return mount(ThemeToggle, {
    global: {
      plugins: [pinia, i18n],
    },
  });
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockPrefersDark(false);
  });

  afterEach(() => {
    useThemeStore().reset();
    vi.unstubAllGlobals();
  });

  it('switches to dark and stores the mode, then back to light', async () => {
    const wrapper = mountToggle();

    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 20 20');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();

    await wrapper.get('button').trigger('click');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(wrapper.get('button').attributes('aria-label')).toBe('layout.themeToggle.toLight');

    await wrapper.get('button').trigger('click');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(wrapper.get('button').attributes('aria-label')).toBe('layout.themeToggle.toDark');
  });

  it('switches a stored dark mode to light', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const wrapper = mountToggle();

    expect(wrapper.get('button').attributes('aria-label')).toBe('layout.themeToggle.toLight');

    await wrapper.get('button').trigger('click');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

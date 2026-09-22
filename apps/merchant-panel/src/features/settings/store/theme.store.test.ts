import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY } from '../lib/theme';
import { useThemeStore } from './theme.store';

function mockPrefersDark(matches: boolean) {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener,
      removeEventListener,
    })),
  );
  return { addEventListener, removeEventListener };
}

describe('useThemeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockPrefersDark(false);
    setActivePinia(createPinia());
  });

  afterEach(() => {
    useThemeStore().reset();
    vi.unstubAllGlobals();
  });

  it('hydrates the stored preference onto the document', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const store = useThemeStore();

    store.hydrate();

    expect(store.mode).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('saves the chosen mode and applies it immediately', () => {
    const store = useThemeStore();
    store.hydrate();

    store.setMode('light');

    expect(store.mode).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('follows the OS scheme when the mode is system', () => {
    mockPrefersDark(true);
    setActivePinia(createPinia());
    const store = useThemeStore();

    store.setMode('system');

    expect(store.resolved).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});

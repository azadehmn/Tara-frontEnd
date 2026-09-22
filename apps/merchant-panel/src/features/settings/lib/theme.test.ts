import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  THEME_STORAGE_KEY,
  applyThemeMode,
  isThemeMode,
  readThemeMode,
  resolveTheme,
  writeThemeMode,
} from './theme';

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

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockPrefersDark(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('accepts only light, dark, and system', () => {
    expect(isThemeMode('light')).toBe(true);
    expect(isThemeMode('dark')).toBe(true);
    expect(isThemeMode('system')).toBe(true);
    expect(isThemeMode('auto')).toBe(false);
    expect(isThemeMode(null)).toBe(false);
  });

  it('defaults to system when nothing is stored', () => {
    expect(readThemeMode()).toBe('system');
  });

  it('reads and writes the preference', () => {
    writeThemeMode('dark');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(readThemeMode()).toBe('dark');
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'midnight');
    expect(readThemeMode()).toBe('system');
  });

  it('resolves system from the OS preference', () => {
    mockPrefersDark(true);
    expect(resolveTheme('system')).toBe('dark');
    mockPrefersDark(false);
    expect(resolveTheme('system')).toBe('light');
    expect(resolveTheme('light')).toBe('light');
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('applies the resolved theme on the document', () => {
    applyThemeMode('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    mockPrefersDark(false);
    applyThemeMode('system');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

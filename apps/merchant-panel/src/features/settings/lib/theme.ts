export const THEME_STORAGE_KEY = 'tara:appearance:theme';

export const THEME_MODES = ['light', 'dark', 'system'] as const;

export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = 'light' | 'dark';

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function prefersDarkScheme(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') return prefersDarkScheme() ? 'dark' : 'light';
  return mode;
}

export function readThemeMode(storage: Storage = localStorage): ThemeMode {
  try {
    const value = storage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(value) ? value : 'system';
  } catch {
    return 'system';
  }
}

export function writeThemeMode(mode: ThemeMode, storage: Storage = localStorage): void {
  try {
    storage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Keep the in-memory choice even if storage is blocked.
  }
}

export function applyResolvedTheme(theme: ResolvedTheme): void {
  document.documentElement.dataset.theme = theme;
}

export function applyThemeMode(mode: ThemeMode): ResolvedTheme {
  const resolved = resolveTheme(mode);
  applyResolvedTheme(resolved);
  return resolved;
}

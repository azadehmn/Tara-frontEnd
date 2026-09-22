import { defineStore } from 'pinia';
import {
  applyThemeMode,
  readThemeMode,
  resolveTheme,
  writeThemeMode,
  type ResolvedTheme,
  type ThemeMode,
} from '../lib/theme';

let systemMedia: MediaQueryList | null = null;
let systemHandler: ((event: MediaQueryListEvent) => void) | null = null;

function unbindSystemThemeListener() {
  if (systemMedia && systemHandler) {
    systemMedia.removeEventListener('change', systemHandler);
  }
  systemMedia = null;
  systemHandler = null;
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: readThemeMode() as ThemeMode,
  }),
  getters: {
    resolved(state): ResolvedTheme {
      return resolveTheme(state.mode);
    },
  },
  actions: {
    hydrate(): void {
      this.mode = readThemeMode();
      applyThemeMode(this.mode);
      this.syncSystemListener();
    },
    setMode(mode: ThemeMode): void {
      this.mode = mode;
      writeThemeMode(mode);
      applyThemeMode(mode);
      this.syncSystemListener();
    },
    syncSystemListener(): void {
      unbindSystemThemeListener();
      if (this.mode !== 'system') return;
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

      systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
      systemHandler = () => {
        if (this.mode === 'system') applyThemeMode('system');
      };
      systemMedia.addEventListener('change', systemHandler);
    },
    reset(): void {
      unbindSystemThemeListener();
      this.mode = 'system';
    },
  },
});

import { ref } from 'vue';

export const APP_LOADING_SPLASH_MS = 700;

const isLoading = ref(true);
let hideTimer: ReturnType<typeof window.setTimeout> | undefined;

export function useAppLoading() {
  function show(durationMs?: number) {
    isLoading.value = true;
    if (hideTimer !== undefined) {
      window.clearTimeout(hideTimer);
      hideTimer = undefined;
    }
    if (durationMs == null) return;
    hideTimer = window.setTimeout(() => {
      isLoading.value = false;
      hideTimer = undefined;
    }, durationMs);
  }

  function hide() {
    if (hideTimer !== undefined) {
      window.clearTimeout(hideTimer);
      hideTimer = undefined;
    }
    isLoading.value = false;
  }

  return { isLoading, show, hide };
}

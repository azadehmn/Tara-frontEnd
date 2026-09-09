import { onMounted, onUnmounted, ref } from 'vue';
import { breakpoint } from '../../tokens/breakpoint';
import type { TrNavigationMode } from './NavigationBar';

// Viewport ≥ xl        → expanded
// lg ≤ Viewport < xl   → collapsed
// Viewport < lg        → overlay

function readMode(): TrNavigationMode {
  if (typeof window === 'undefined') return 'overlay';

  if (window.matchMedia(`(min-width: ${breakpoint.xl})`).matches) {
    return 'expanded';
  }

  if (window.matchMedia(`(min-width: ${breakpoint.lg})`).matches) {
    return 'collapsed';
  }

  return 'overlay';
}

/** Maps viewport breakpoints to navigation presentation mode. */
export function useNavigationMode() {
  const mode = ref<TrNavigationMode>(readMode());
  let xl: MediaQueryList | undefined;
  let lg: MediaQueryList | undefined;

  function sync() {
    mode.value = readMode();
  }

  onMounted(() => {
    xl = window.matchMedia(`(min-width: ${breakpoint.xl})`);
    lg = window.matchMedia(`(min-width: ${breakpoint.lg})`);
    sync();
    xl.addEventListener('change', sync);
    lg.addEventListener('change', sync);
    window.addEventListener('resize', sync);
  });

  onUnmounted(() => {
    xl?.removeEventListener('change', sync);
    lg?.removeEventListener('change', sync);
    window.removeEventListener('resize', sync);
  });

  return { mode };
}

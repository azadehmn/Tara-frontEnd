import { onMounted, onUnmounted, ref } from 'vue';
import { breakpoint } from '../../tokens/breakpoint';
import type { TrNavigationMode } from './NavigationBar';

/** Icon rail + mobile-style toggle: 992px ≤ width < xl (1200px). */
const railMin = '992px';

// Viewport ≥ xl (1200)     → expanded (hamburger expands/collapses)
// 992 ≤ Viewport < 1200    → collapsed (hamburger opens overlay)
// Viewport < 992           → overlay

function readMode(): TrNavigationMode {
  if (typeof window === 'undefined') return 'overlay';

  if (window.matchMedia(`(min-width: ${breakpoint.xl})`).matches) {
    return 'expanded';
  }

  if (window.matchMedia(`(min-width: ${railMin})`).matches) {
    return 'collapsed';
  }

  return 'overlay';
}

/** Maps viewport breakpoints to navigation presentation mode. */
export function useNavigationMode() {
  const mode = ref<TrNavigationMode>(readMode());
  let xl: MediaQueryList | undefined;
  let rail: MediaQueryList | undefined;

  function sync() {
    mode.value = readMode();
  }

  onMounted(() => {
    xl = window.matchMedia(`(min-width: ${breakpoint.xl})`);
    rail = window.matchMedia(`(min-width: ${railMin})`);
    sync();
    xl.addEventListener('change', sync);
    rail.addEventListener('change', sync);
    window.addEventListener('resize', sync);
  });

  onUnmounted(() => {
    xl?.removeEventListener('change', sync);
    rail?.removeEventListener('change', sync);
    window.removeEventListener('resize', sync);
  });

  return { mode };
}

import { computed, onMounted, onUnmounted, ref } from 'vue';
import { breakpoint } from '../tokens/breakpoint';

export type TrBreakpointName = keyof typeof breakpoint;

function px(name: TrBreakpointName): number {
  return Number.parseInt(breakpoint[name], 10);
}

function readWidth(): number {
  if (typeof window === 'undefined') return px('xl');
  return window.innerWidth;
}

/**
 * Viewport width against Tara layout tokens (min-width).
 * Flags are true when the viewport is *below* that token, matching  `useSize`.
 */
export function useBreakpoint() {
  const width = ref(px('xl'));
  let frame = 0;

  function sync() {
    width.value = readWidth();
  }

  function onResize() {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  }

  onMounted(() => {
    sync();
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
  });

  const xs = computed(() => width.value < px('xs'));
  const sm = computed(() => width.value < px('sm'));
  const md = computed(() => width.value < px('md'));
  const lg = computed(() => width.value < px('lg'));
  const xl = computed(() => width.value < px('xl'));
  const xxl = computed(() => width.value < px('2xl'));

  function isBelow(name: TrBreakpointName): boolean {
    return width.value < px(name);
  }

  return {
    breakpoint,
    width,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    isBelow,
  };
}

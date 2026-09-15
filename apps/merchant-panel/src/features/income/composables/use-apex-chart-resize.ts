import { onUnmounted, ref, watch } from 'vue';

/**
 * Keeps an ApexCharts canvas in sync while its container is being resized.
 * ApexCharts redraws after a delay, so the canvas is scaled until that redraw.
 */
export function useApexChartResize() {
  const container = ref<HTMLElement | null>(null);
  let observer: ResizeObserver | undefined;

  function fit() {
    const host = container.value;
    const canvas = host?.querySelector<HTMLElement>('.apexcharts-canvas');
    if (!host || !canvas || !canvas.offsetWidth) return;

    const scale = host.clientWidth / canvas.offsetWidth;
    canvas.style.transform = Math.abs(scale - 1) < 0.01 ? 'none' : `scaleX(${scale})`;
    canvas.style.transformOrigin =
      document.documentElement.dir === 'rtl' ? 'right top' : 'left top';
  }

  watch(container, (element) => {
    observer?.disconnect();
    if (!element) return;

    observer = new ResizeObserver(() => requestAnimationFrame(fit));
    observer.observe(element);
  });

  onUnmounted(() => observer?.disconnect());

  return { container, fit };
}

import { onUnmounted, watch, type Ref } from 'vue';

export function useApexChartResize(container: Ref<HTMLElement | null>) {
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

  return { fit };
}

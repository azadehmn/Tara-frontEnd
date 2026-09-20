import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export type ImageSliderFit = 'cover' | 'contain';

export type ImageSlide = {
  src: string;
  alt?: string;
};

export type ImageSliderProps = {
  slides: ImageSlide[];
  intervalMs?: number;
  autoplay?: boolean;
  fit?: ImageSliderFit;
  prevLabel?: string;
  nextLabel?: string;
};

export function useImageSlider(props: {
  slides: ImageSlide[];
  intervalMs: number;
  autoplay: boolean;
}) {
  const activeIndex = ref(0);
  const paused = ref(false);
  let timer: number | undefined;

  const hasMultiple = computed(() => props.slides.length > 1);
  const activeSlide = computed(() => props.slides[activeIndex.value]);

  function goTo(index: number) {
    const total = props.slides.length;
    if (!total) return;
    activeIndex.value = ((index % total) + total) % total;
  }

  function next() {
    goTo(activeIndex.value + 1);
  }

  function prev() {
    goTo(activeIndex.value - 1);
  }

  function stopTimer() {
    if (timer === undefined) return;
    window.clearInterval(timer);
    timer = undefined;
  }

  function startTimer() {
    stopTimer();
    if (!props.autoplay || !hasMultiple.value) return;
    timer = window.setInterval(() => {
      if (!paused.value) next();
    }, props.intervalMs);
  }

  watch(
    () => [props.autoplay, props.intervalMs, props.slides.length] as const,
    () => {
      if (activeIndex.value >= props.slides.length) activeIndex.value = 0;
      startTimer();
    },
  );

  onMounted(startTimer);
  onBeforeUnmount(stopTimer);

  return {
    activeIndex,
    paused,
    hasMultiple,
    activeSlide,
    goTo,
    next,
    prev,
  };
}

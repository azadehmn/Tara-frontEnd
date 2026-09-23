<template>
  <div
    class="relative h-full w-full overflow-hidden bg-[#1d0735]"
    dir="ltr"
    role="region"
    aria-roledescription="carousel"
    :aria-label="activeSlide?.alt || undefined"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <div class="absolute inset-0">
      <img
        v-for="(slide, index) in slides"
        :key="slide.src"
        :src="slide.src"
        :alt="slide.alt || ''"
        class="absolute inset-0 size-full object-center transition-opacity duration-500 object-cover"
        :class="[
          fit === 'cover' ? 'object-contain' : 'object-contain',
          index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
        ]"
        draggable="false"
        decoding="async"
      />
    </div>

    <div v-if="hasMultiple" class="absolute inset-x-md bottom-md z-10 flex items-center gap-xs">
      <button
        type="button"
        class="inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-[#2e2e38] shadow-sm transition hover:bg-white"
        :aria-label="prevLabel"
        @click="prev"
      >
        <svg viewBox="0 0 16 16" class="size-4" fill="none" aria-hidden="true">
          <path
            d="M10 3.5 5.5 8 10 12.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        class="inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-[#2e2e38] shadow-sm transition hover:bg-white"
        :aria-label="nextLabel"
        @click="next"
      >
        <svg viewBox="0 0 16 16" class="size-4" fill="none" aria-hidden="true">
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="ms-xs flex items-center gap-2xs" role="tablist">
        <button
          v-for="(slide, index) in slides"
          :key="`${slide.src}-dot`"
          type="button"
          class="h-1.5 rounded-full transition-all"
          :class="index === activeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/45'"
          :aria-label="slide.alt || String(index + 1)"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="goTo(index)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useImageSlider, type ImageSlide, type ImageSliderFit } from './ImageSlider';

defineOptions({ name: 'ImageSlider' });

const props = withDefaults(
  defineProps<{
    slides: ImageSlide[];
    intervalMs?: number;
    autoplay?: boolean;
    fit?: ImageSliderFit;
    prevLabel?: string;
    nextLabel?: string;
  }>(),
  {
    intervalMs: 10000,
    autoplay: true,
    fit: 'cover',
    prevLabel: 'Previous',
    nextLabel: 'Next',
  },
);

const { activeIndex, paused, hasMultiple, activeSlide, goTo, prev, next } = useImageSlider(props);
</script>

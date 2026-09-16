<script setup lang="ts">
import { computed } from 'vue';

const WIDTH = 96;
const HEIGHT = 32;
const PADDING = 3;

const props = defineProps<{
  values: number[];
  tone: 'success' | 'danger' | 'neutral';
}>();

/*--------------------------------------------------------------------------------
Normalize values and convert them to x/y coordinates for the SVG.
 -------------------------------------------------------------------------------- */
const points = computed(() => {
  // Convert invalid values like NaN or Infinity to zero 0.

  const values = props.values.map((value) => (Number.isFinite(value) ? value : 0));
  if (!values.length) return [];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  return values.map((value, index) => ({
    x: values.length === 1 ? WIDTH / 2 : (index / (values.length - 1)) * WIDTH,
    y: range === 0 ? HEIGHT / 2 : PADDING + ((max - value) / range) * (HEIGHT - PADDING * 2),
  }));
});

/*--------------------------------------------------------------------------------
 Build the SVG line path from the calculated points.
 -------------------------------------------------------------------------------- */
const linePath = computed(() =>
  points.value
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' '),
);
/*--------------------------------------------------------------------------------
  Build the filled area path below the line.
 -------------------------------------------------------------------------------- */
const areaPath = computed(() => {
  if (!linePath.value) return '';
  return `${linePath.value} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
});
</script>

<template>
  <svg
    class="mini-sparkline"
    :class="`mini-sparkline--${tone}`"
    :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path v-if="areaPath" :d="areaPath" fill="currentColor" opacity="0.1" />
    <path
      v-if="linePath"
      :d="linePath"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped>
.mini-sparkline {
  width: 6rem;
  height: 2rem;
}

.mini-sparkline--success {
  color: var(--color-text-success);
}

.mini-sparkline--danger {
  color: var(--color-text-danger);
}

.mini-sparkline--neutral {
  color: var(--color-text-soft);
}

:global(html[data-theme='dark']) .mini-sparkline--success {
  color: var(--color-text-dark-success);
}

:global(html[data-theme='dark']) .mini-sparkline--danger {
  color: var(--color-text-dark-danger);
}

:global(html[data-theme='dark']) .mini-sparkline--neutral {
  color: var(--color-text-dark-soft);
}
</style>

<script setup lang="ts">
import type { TrLabelProps } from './Label';

defineOptions({ name: 'TrLabel' });

withDefaults(defineProps<TrLabelProps>(), {
  type: 'positive',
  size: 'small',
  radius: 'sm',
  width: 'fit',
});
</script>

<template>
  <span
    class="tr-label"
    :class="[
      `tr-label--${type}`,
      `tr-label--${size}`,
      `tr-label--radius-${radius}`,
      `tr-label--width-${width}`,
    ]"
  >
    {{ text }}
  </span>
</template>

<style src="./styles.css"></style>

<script setup lang="ts">
import type { TrIconProps } from './Icon';

defineOptions({ name: 'TrIcon' });

withDefaults(defineProps<TrIconProps>(), {
  size: 'md',
});
</script>

<template>
  <span
    class="tr-icon"
    :class="`tr-icon--${size}`"
    :aria-hidden="!label"
    :aria-label="label"
    :role="label ? 'img' : undefined"
  >
    <slot />
  </span>
</template>

<style src="./styles.css"></style>

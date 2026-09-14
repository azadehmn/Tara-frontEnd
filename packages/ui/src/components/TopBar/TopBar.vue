<script setup lang="ts">
import type { TrTopBarProps } from './TopBar';

defineOptions({ name: 'TrTopBar' });

defineProps<TrTopBarProps>();
</script>

<template>
  <header class="tr-top-bar" :aria-label="ariaLabel">
    <div v-if="$slots.start" class="tr-top-bar__start">
      <slot name="start" />
    </div>

    <div v-if="$slots.default" class="tr-top-bar__center">
      <slot />
    </div>

    <div v-if="$slots.end" class="tr-top-bar__end">
      <slot name="end" />
    </div>
  </header>
</template>

<style src="./TopBar.css"></style>

<script setup lang="ts">
import type { TrStatusProps } from './Status';

defineOptions({ name: 'TrStatus' });

withDefaults(defineProps<TrStatusProps>(), {
  text: '',
  dot: false,
});
</script>

<template>
  <div
    class="tr-status"
    :class="[`tr-status--${type}`, { 'tr-status--compact': Boolean(icon && !text) }]"
  >
    <p v-if="text" class="tr-status__text">{{ text }}</p>
    <span v-if="dot" class="tr-status__dot" aria-hidden="true" />
    <span v-if="icon" class="tr-status__icon" :class="iconClass">
      <component :is="icon" />
    </span>
  </div>
</template>

<style src="./styles.css"></style>

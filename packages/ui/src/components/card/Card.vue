<script setup lang="ts">
import { useSlots } from 'vue';
import type { TrCardProps } from './Card';

defineOptions({ name: 'Tr-Card' });

withDefaults(defineProps<TrCardProps>(), {
  padding: 'md',
});

const slots = useSlots();
</script>

<template>
  <div class="tr-card" :class="`tr-card--padding-${padding}`">
    <div v-if="slots.header" class="tr-card__header">
      <slot name="header" />
    </div>
    <div class="tr-card__body">
      <slot name="main">
        <slot />
      </slot>
    </div>
    <div v-if="slots.footer" class="tr-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style src="./styles.css"></style>

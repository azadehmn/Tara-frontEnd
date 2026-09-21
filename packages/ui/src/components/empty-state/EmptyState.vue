<script setup lang="ts">
import { computed } from 'vue';
import { resolveEmptyVector } from './vector';

defineOptions({ name: 'TrEmptyState' });

const props = withDefaults(
  defineProps<{
    vector?: string;
    title?: string;
    description?: string;
  }>(),
  {
    vector: 'EmptyPaper',
    title: '',
    description: '',
  },
);

const vectorName = computed(() => props.vector || 'EmptyPaper');
const lightVector = computed(() => resolveEmptyVector(vectorName.value) ?? resolveEmptyVector('EmptyPaper'));
const darkVector = computed(() => {
  const name = vectorName.value;
  if (name.endsWith('Dark')) return undefined;
  return resolveEmptyVector(`${name}Dark`);
});
</script>

<template>
  <div class="tr-empty-state">
    <div class="tr-empty-state__media">
      <slot name="media">
        <component
          :is="lightVector"
          class="tr-empty-state__illustration"
          :class="{ 'tr-empty-state__illustration--light': Boolean(darkVector) }"
        />
        <component
          v-if="darkVector"
          :is="darkVector"
          class="tr-empty-state__illustration tr-empty-state__illustration--dark"
        />
      </slot>
    </div>
    <p v-if="title" class="tr-empty-state__title">{{ title }}</p>
    <p v-if="description" class="tr-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="tr-empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style src="./styles.css"></style>

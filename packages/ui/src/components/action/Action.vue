<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { TrButton } from '../button';
import { TrCard } from '../card';
import type { TrActionItem, TrActionProps } from './Action';

defineOptions({ name: 'TrAction' });

const props = withDefaults(defineProps<TrActionProps>(), {
  items: () => [],
  ariaLabel: 'Actions',
});

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);

const visibleItems = computed(() => props.items.filter((item) => item.active !== false));

function toggle(event: MouseEvent) {
  event.stopPropagation();
  open.value = !open.value;
}

function run(item: TrActionItem, event: MouseEvent) {
  event.stopPropagation();
  if (item.disabled) return;
  open.value = false;
  item.command();
}

function onDocumentPointer(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (rootRef.value?.contains(target)) return;
  open.value = false;
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  open.value = false;
}

onMounted(() => {
  document.addEventListener('click', onDocumentPointer);
  document.addEventListener('keydown', onEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentPointer);
  document.removeEventListener('keydown', onEscape);
});
</script>

<template>
  <div ref="rootRef" class="tr-action">
    <TrButton
      variant="outlined"
      size="small"
      :aria-label="ariaLabel"
      :selected="open"
      :aria-expanded="open"
      @click="toggle"
    >
      <template #icon>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </template>
    </TrButton>
    <div v-show="open" class="tr-action__menu" role="menu">
      <TrCard padding="sm">
        <button
          v-for="item in visibleItems"
          :key="item.id"
          type="button"
          class="tr-action__item"
          role="menuitem"
          :disabled="item.disabled"
          @click="run(item, $event)"
        >
          {{ item.label }}
        </button>
      </TrCard>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
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

// Hover open — keep if design wants desktop hover later:
// function openMenu(event?: Event) {
//   event?.stopPropagation();
//   open.value = true;
// }

function closeMenu() {
  open.value = false;
}

function toggleMenu(event: MouseEvent) {
  event.stopPropagation();
  open.value = !open.value;
}

function run(item: TrActionItem, event: MouseEvent) {
  event.stopPropagation();
  if (item.disabled) return;
  closeMenu();
  item.command();
}

function onDocumentPointer(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (rootRef.value?.contains(target)) return;
  closeMenu();
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  closeMenu();
}

function bindDocumentListeners() {
  document.addEventListener('click', onDocumentPointer);
  document.addEventListener('keydown', onEscape);
}

function unbindDocumentListeners() {
  document.removeEventListener('click', onDocumentPointer);
  document.removeEventListener('keydown', onEscape);
}

watch(open, (isOpen) => {
  if (isOpen) {
    bindDocumentListeners();
  } else {
    unbindDocumentListeners();
  }
});

onBeforeUnmount(() => {
  unbindDocumentListeners();
});
</script>

<template>
  <!-- Hover (optional): @mouseenter="openMenu()" @mouseleave="closeMenu" -->
  <div ref="rootRef" class="tr-action">
    <button
      type="button"
      class="tr-action__trigger"
      :aria-label="ariaLabel"
      :aria-expanded="open"
      @click="toggleMenu"
    >
      <svg
        class="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
          fill="currentColor"
        ></path>
      </svg>
      <!-- <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <circle cx="8" cy="3" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="8" cy="13" r="1.5" />
      </svg> -->
    </button>
    <div v-show="open" class="tr-action__menu" role="menu">
      <TrCard padding="none">
        <button
          v-for="item in visibleItems"
          :key="item.id"
          type="button"
          class="tr-action__item"
          :class="[item.itemClass, item.tone && `tr-action__item--${item.tone}`]"
          role="menuitem"
          :disabled="item.disabled"
          @click="run(item, $event)"
        >
          <span v-if="item.icon" class="tr-action__item-icon" :class="item.iconClass">
            <component :is="item.icon" />
          </span>
          {{ item.label }}
        </button>
      </TrCard>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

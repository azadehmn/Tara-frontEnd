<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, useSlots, watch } from 'vue';
import { TrIcon } from '../icon';
import CloseIcon from '../../icons/CloseIcon.vue';
import type { TrModalProps } from './Modal';

defineOptions({
  name: 'TrModal',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TrModalProps>(), {
  open: false,
  title: '',
  showHeader: true,
  showClose: true,
  closeOnOutside: true,
  headerBorder: true,
  footerBorder: true,
  bodyClass: '',
  width: '',
  size: 'sm',
  closeAriaLabel: 'Close',
});

const emit = defineEmits<{
  close: [];
  'update:open': [value: boolean];
}>();

const slots = useSlots();
const dialogRef = ref<HTMLElement | null>(null);
const titleId = `tr-modal-title-${useId().replaceAll(':', '')}`;
let previousOverflow = '';

const hasFooter = computed(
  () => Boolean(slots.footer || slots.startFooter || slots.endFooter || slots.leftFooter || slots.rightFooter),
);

const dialogStyle = computed(() => {
  if (!props.width) return undefined;
  return { '--tr-modal-width': props.width } as Record<string, string>;
});

function close() {
  emit('update:open', false);
  emit('close');
}

function onOverlayClick() {
  if (props.closeOnOutside) close();
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !props.open) return;
  event.stopPropagation();
  close();
}

function lockScroll() {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = previousOverflow;
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      lockScroll();
      document.addEventListener('keydown', onEscape);
      await nextTick();
      dialogRef.value?.focus();
      return;
    }
    document.removeEventListener('keydown', onEscape);
    unlockScroll();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape);
  if (props.open) unlockScroll();
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="tr-modal"
      role="presentation"
      v-bind="$attrs"
      @click="onOverlayClick"
    >
      <div
        ref="dialogRef"
        class="tr-modal__dialog"
        :class="[`tr-modal__dialog--${size}`, { 'tr-modal__dialog--custom': Boolean(width) }]"
        :style="dialogStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="showHeader && title ? titleId : undefined"
        tabindex="-1"
        @click.stop
      >
        <header
          v-if="showHeader"
          class="tr-modal__header"
          :class="{ 'tr-modal__header--bordered': headerBorder }"
        >
          <slot name="header">
            <h2 v-if="title" :id="titleId" class="tr-modal__title">{{ title }}</h2>
            <span v-else class="tr-modal__title-spacer" />
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="tr-modal__close"
            :aria-label="closeAriaLabel"
            @click="close"
          >
            <TrIcon size="md">
              <CloseIcon />
            </TrIcon>
          </button>
        </header>

        <div class="tr-modal__body" :class="bodyClass">
          <slot>
            <slot name="body" />
          </slot>
        </div>

        <footer
          v-if="hasFooter"
          class="tr-modal__footer"
          :class="{ 'tr-modal__footer--bordered': footerBorder }"
        >
          <div v-if="slots.endFooter || slots.rightFooter" class="tr-modal__footer-end">
            <slot name="endFooter">
              <slot name="rightFooter" />
            </slot>
          </div>
          <slot name="footer" />
          <div v-if="slots.startFooter || slots.leftFooter" class="tr-modal__footer-start">
            <slot name="startFooter">
              <slot name="leftFooter" />
            </slot>
          </div>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style src="./styles.css"></style>

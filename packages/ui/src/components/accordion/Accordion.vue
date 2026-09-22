<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue';
import { TrIcon } from '../icon';
import ChevronDownIcon from '../../icons/ChevronDownIcon.vue';
import type { TrAccordionProps } from './Accordion';

defineOptions({ name: 'TrAccordion' });

const props = withDefaults(defineProps<TrAccordionProps>(), {
  content: '',
  iconPosition: 'end',
  defaultOpen: false,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const instance = getCurrentInstance();
const uncontrolledOpen = ref(props.defaultOpen);
const isControlled = computed(() => {
  const raw = instance?.vnode.props;
  return raw != null && ('open' in raw || 'onUpdate:open' in raw);
});
const isOpen = computed(() => (isControlled.value ? Boolean(props.open) : uncontrolledOpen.value));

watch(
  () => props.open,
  (next) => {
    if (next !== undefined) uncontrolledOpen.value = next;
  },
);

function toggle() {
  if (props.disabled || props.loading) return;
  const next = !isOpen.value;
  if (!isControlled.value) uncontrolledOpen.value = next;
  emit('update:open', next);
}
</script>

<template>
  <div
    class="tr-accordion"
    :class="{
      'is-open': isOpen,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <h3 class="tr-accordion__heading">
      <button
        type="button"
        class="tr-accordion__header"
        :class="`tr-accordion__header--icon-${iconPosition}`"
        :aria-expanded="isOpen"
        :disabled="disabled || loading"
        @click="toggle"
      >
        <span v-if="loading" class="tr-accordion__skeleton tr-accordion__skeleton--title" />
        <span v-else class="tr-accordion__title">{{ title }}</span>
        <TrIcon v-if="!loading" size="md" class="tr-accordion__chevron">
          <component :is="icon ?? ChevronDownIcon" />
        </TrIcon>
      </button>
    </h3>
    <div v-show="isOpen && !loading" class="tr-accordion__panel">
      <div class="tr-accordion__body">
        <slot>
          <p v-if="content" class="tr-accordion__content">{{ content }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

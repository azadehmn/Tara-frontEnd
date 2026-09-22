<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import type { Component } from 'vue';
import { TrIcon } from '../icon';
import CircleCheckIcon from '../../icons/CircleCheckIcon.vue';
import CircleSlashIcon from '../../icons/CircleSlashIcon.vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import InfoIcon from '../../icons/InfoIcon.vue';
import WarningIcon from '../../icons/WarningIcon.vue';
import type { TrInlineMessageProps, TrInlineMessageType } from './InlineMessage';

defineOptions({ name: 'TrInlineMessage' });

const props = withDefaults(defineProps<TrInlineMessageProps>(), {
  type: 'neutral',
  title: '',
  description: '',
  loading: false,
  dismissible: false,
  dismissAriaLabel: 'Dismiss',
});

const emit = defineEmits<{
  dismiss: [];
}>();

const slots = useSlots();
const visible = ref(true);

const defaultIcons: Record<TrInlineMessageType, Component> = {
  neutral: InfoIcon,
  informative: InfoIcon,
  warning: WarningIcon,
  negative: CircleSlashIcon,
  positive: CircleCheckIcon,
};

const resolvedIcon = computed(() => props.icon ?? defaultIcons[props.type]);
const role = computed(() =>
  props.type === 'warning' || props.type === 'negative' ? 'alert' : 'status',
);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>

<template>
  <div
    v-if="visible"
    class="tr-inline-message"
    :class="`tr-inline-message--${type}`"
    :role="role"
  >
    <TrIcon size="md" class="tr-inline-message__icon">
      <component :is="resolvedIcon" />
    </TrIcon>

    <div class="tr-inline-message__main">
      <div v-if="title || dismissible || loading" class="tr-inline-message__header">
        <span
          v-if="loading"
          class="tr-inline-message__skeleton tr-inline-message__skeleton--title"
          aria-hidden="true"
        />
        <p v-else-if="title" class="tr-inline-message__title">{{ title }}</p>
        <span v-else class="tr-inline-message__title-spacer" />
        <button
          v-if="dismissible && !loading"
          type="button"
          class="tr-inline-message__dismiss"
          :aria-label="dismissAriaLabel"
          @click="dismiss"
        >
          <TrIcon size="md">
            <CloseIcon />
          </TrIcon>
        </button>
      </div>

      <span
        v-if="loading"
        class="tr-inline-message__skeleton tr-inline-message__skeleton--description"
        aria-hidden="true"
      />
      <p v-else-if="description" class="tr-inline-message__description">{{ description }}</p>
      <div v-if="!loading && slots.description" class="tr-inline-message__description">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

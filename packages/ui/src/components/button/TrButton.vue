<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { TrButtonProps } from './TrButton';

const props = withDefaults(defineProps<TrButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  htmlType: 'button',
  disabled: false,
  loading: false,
  selected: false,
});

const slots = useSlots();

const isDisabled = computed(() => props.disabled || props.loading);

const hasLabel = computed(() => Boolean(props.text || slots.default));

const isIconOnly = computed(() => Boolean(slots.icon) && !hasLabel.value);
</script>

<template>
  <button
    :type="htmlType"
    class="tr-button"
    :class="[
      `tr-button--${variant}`,
      `tr-button--${size}`,
      {
        'is-loading': loading,
        'is-selected': selected,
        'is-icon-only': isIconOnly,
      },
    ]"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :aria-pressed="selected || undefined"
    :aria-label="isIconOnly || loading ? ariaLabel : undefined"
  >
    <span class="tr-button__body">
      <span v-if="$slots.icon && isIconOnly" class="tr-button__icon">
        <slot name="icon" />
      </span>

      <template v-if="!isIconOnly">
        <span v-if="$slots['before-icon']" class="tr-button__icon">
          <slot name="before-icon" />
        </span>
        <span v-if="hasLabel" class="tr-button__label">
          <slot>{{ text }}</slot>
        </span>
        <span v-if="$slots['after-icon']" class="tr-button__icon">
          <slot name="after-icon" />
        </span>
      </template>
    </span>

    <span v-if="loading" class="tr-button__pulse" aria-hidden="true" />
  </button>
</template>

<style src="./TrButton.css"></style>

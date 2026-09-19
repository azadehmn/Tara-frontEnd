<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, useId, useSlots } from 'vue';
import { TrButton } from '../button';
import { TrIcon } from '../icon';
import {
  amountInWords,
  isDigitKey,
  sanitizeTextFieldValue,
  type TrTextFieldProps,
} from './TextField';

defineOptions({
  name: 'TrTextField',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TrTextFieldProps>(), {
  modelValue: '',
  placeholder: '',
  label: true,
  disabled: false,
  loading: false,
  autoFocus: false,
  isNumber: false,
  amount: false,
  isLtr: false,
  inputClass: '',
  maxLength: 0,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  action: [];
}>();

const attrs = useAttrs();
const slots = useSlots();
const inputRef = ref<HTMLInputElement>();
const focused = ref(false);
const generatedId = useId().replaceAll(':', '');

const fieldId = computed(() => props.id || props.name || `tr-text-field-${generatedId}`);
const helperId = computed(() => `${fieldId.value}-helper`);
const limitId = computed(() => `${fieldId.value}-limit`);
const amountHintId = computed(() => `${fieldId.value}-amount`);

const rootClass = computed(() => attrs.class);
const rootStyle = computed(() => attrs.style);
const inputAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    onFocus: _onFocus,
    onBlur: _onBlur,
    ...rest
  } = attrs;
  return rest;
});

const isDisabled = computed(() => props.disabled || props.loading);
const isReadonly = computed(() => props.loading || Boolean(attrs.readonly));
const hasError = computed(() => props.helper?.type === 'error' && Boolean(props.helper.message));
const helperMessage = computed(() => props.helper?.message?.trim() ?? '');
const showHelper = computed(() => Boolean(helperMessage.value && props.helper?.type));
const showLimit = computed(() => props.maxLength > 0 && !props.amount);
const hasValue = computed(() => props.modelValue.length > 0);
const showFloatingLabel = computed(
  () =>
    Boolean(props.label && props.placeholder) &&
    !props.loading &&
    (focused.value || hasValue.value),
);
const showBefore = computed(() => Boolean(slots.before || props.beforeIcon));
const showAfter = computed(() => Boolean(slots.after || props.afterIcon));
const showUnit = computed(() => !showAfter.value && Boolean(slots.unit || props.unit));
const showButton = computed(() => !showAfter.value && !showUnit.value && Boolean(props.button));
const restrictToDigits = computed(() => props.isNumber || props.amount);
const displayValue = computed(() =>
  props.amount ? sanitizeTextFieldValue(props.modelValue, { amount: true, maxLength: props.maxLength }) : props.modelValue,
);
const words = computed(() => (props.amount ? amountInWords(props.modelValue) : ''));
const describedBy = computed(() => {
  const ids: string[] = [];
  if (showHelper.value) ids.push(helperId.value);
  if (showLimit.value) ids.push(limitId.value);
  if (words.value) ids.push(amountHintId.value);
  return ids.join(' ') || undefined;
});
const inputPlaceholder = computed(() =>
  showFloatingLabel.value || props.loading ? '' : props.placeholder,
);

function commit(value: string) {
  const next = sanitizeTextFieldValue(value, {
    amount: props.amount,
    isNumber: props.isNumber,
    maxLength: props.maxLength,
  });
  if (next !== props.modelValue) emit('update:modelValue', next);
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  commit(target.value);
  if (props.amount || props.isNumber) {
    void nextTick(() => {
      if (inputRef.value && inputRef.value.value !== displayValue.value) {
        inputRef.value.value = displayValue.value;
      }
    });
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!restrictToDigits.value) return;
  if (!isDigitKey(event)) event.preventDefault();
}

function onFocus(event: FocusEvent) {
  focused.value = true;
  const handler = inputAttrs.value.onFocus;
  if (typeof handler === 'function') handler(event);
}

function onBlur(event: FocusEvent) {
  focused.value = false;
  const handler = inputAttrs.value.onBlur;
  if (typeof handler === 'function') handler(event);
}

function onAction() {
  if (isDisabled.value) return;
  emit('action');
}

function focus() {
  inputRef.value?.focus();
}

onMounted(() => {
  if (props.autoFocus) focus();
});

defineExpose({
  inputRef,
  focus,
});
</script>

<template>
  <div class="tr-text-field" :class="rootClass" :style="rootStyle">
    <div
      class="tr-text-field__control"
      :class="{
        'is-disabled': isDisabled,
        'is-error': hasError,
        'is-loading': loading,
        'is-ltr': isLtr,
      }"
      :dir="isLtr ? 'ltr' : undefined"
    >
      <Transition name="tr-text-field-label">
        <label
          v-if="showFloatingLabel"
          class="tr-text-field__label"
          :for="fieldId"
        >
          {{ placeholder }}
        </label>
      </Transition>

      <span v-if="showBefore" class="tr-text-field__adornment">
        <TrIcon>
          <slot name="before">
            <component :is="beforeIcon" />
          </slot>
        </TrIcon>
      </span>

      <div class="tr-text-field__field">
        <span v-if="loading" class="tr-text-field__skeleton" aria-hidden="true" />
        <input
          :id="fieldId"
          ref="inputRef"
          v-bind="inputAttrs"
          class="tr-text-field__input"
          :class="inputClass"
          :name="name"
          :value="displayValue"
          :type="restrictToDigits ? 'text' : undefined"
          :disabled="disabled"
          :readonly="isReadonly || undefined"
          :placeholder="inputPlaceholder"
          :inputmode="restrictToDigits ? 'numeric' : undefined"
          :maxlength="maxLength > 0 && !amount ? maxLength : undefined"
          :spellcheck="false"
          :aria-invalid="hasError || undefined"
          :aria-busy="loading || undefined"
          :aria-describedby="describedBy"
          @input="onInput"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>

      <button
        v-if="showAfter"
        type="button"
        class="tr-text-field__adornment tr-text-field__adornment--action"
        :disabled="isDisabled"
        @click="onAction"
      >
        <TrIcon>
          <slot name="after">
            <component :is="afterIcon" />
          </slot>
        </TrIcon>
      </button>

      <span v-else-if="showUnit" class="tr-text-field__unit">
        <slot name="unit">{{ unit }}</slot>
      </span>

      <span v-else-if="showButton" class="tr-text-field__button">
        <TrButton
          variant="outlined"
          size="small"
          :text="button"
          :disabled="isDisabled"
          @click="onAction"
        />
      </span>

      <div
        v-if="words"
        :id="amountHintId"
        class="tr-text-field__amount-hint"
        role="status"
      >
        {{ words }}
      </div>
    </div>

    <div v-if="showHelper || showLimit" class="tr-text-field__footer">
      <p
        v-if="showHelper"
        :id="helperId"
        class="tr-text-field__helper"
        :class="`tr-text-field__helper--${helper?.type}`"
      >
        <span v-if="helper?.type === 'error'" class="tr-text-field__helper-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8 1.5A6.5 6.5 0 1 0 14.5 8 6.51 6.51 0 0 0 8 1.5Zm-.75 3.25a.75.75 0 1 1 1.5 0v4a.75.75 0 1 1-1.5 0Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            />
          </svg>
        </span>
        <span v-else-if="helper?.type === 'success'" class="tr-text-field__helper-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" fill="currentColor" />
            <path
              d="M5.2 8.2 7 10l3.8-4"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        {{ helperMessage }}
      </p>
      <p v-if="showLimit" :id="limitId" class="tr-text-field__limit">
        {{ maxLength }}/{{ modelValue.length }}
      </p>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

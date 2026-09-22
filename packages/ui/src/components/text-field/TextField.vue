<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRaw,
  useAttrs,
  useId,
  useSlots,
  type InputHTMLAttributes,
} from 'vue';
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
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  autofill: [];
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
    type: _type,
    inputmode: _inputmode,
    readonly: _readonly,
    spellcheck: _spellcheck,
    ...rest
  } = attrs;
  return rest;
});

const isDisabled = computed(() => props.disabled || props.loading);
const isReadonly = computed(
  () =>
    props.loading ||
    attrs.readonly === '' ||
    attrs.readonly === true ||
    attrs.readonly === 'readonly',
);
const hasError = computed(() => props.helper?.type === 'error');
const helperMessage = computed(() => props.helper?.message?.trim() ?? '');
const showHelper = computed(() => Boolean(helperMessage.value && props.helper?.type));
const showLimit = computed(() => props.maxLength > 0 && !props.amount);
const accessibleLabel = computed(() => props.labelText || props.placeholder);
const direction = computed(() => props.dir ?? (props.isLtr ? 'ltr' : undefined));
const restrictToDigits = computed(() => props.isNumber || props.amount);
const inputType = computed(() =>
  restrictToDigits.value
    ? 'text'
    : typeof attrs.type === 'string'
      ? attrs.type
      : 'text',
);
const inputMode = computed<InputHTMLAttributes['inputmode']>(() =>
  restrictToDigits.value
    ? 'numeric'
    : (attrs.inputmode as InputHTMLAttributes['inputmode']),
);
const nativeSpellcheck = computed<InputHTMLAttributes['spellcheck']>(
  () =>
    attrs.spellcheck === '' ||
    attrs.spellcheck === true ||
    attrs.spellcheck === 'true',
);
const displayValue = computed(() =>
  sanitizeTextFieldValue(props.modelValue, {
    amount: props.amount,
    isNumber: props.isNumber,
    maxLength: props.maxLength,
  }),
);
const hasValue = computed(() => displayValue.value.length > 0);
const showFloatingLabel = computed(
  () =>
    Boolean(props.label && accessibleLabel.value) &&
    !props.loading &&
    (focused.value || hasValue.value),
);
const showBefore = computed(() => Boolean(slots.before || props.beforeIcon));
const showAfter = computed(() => Boolean(slots.after || props.afterIcon));
const beforeIconComponent = computed(() =>
  props.beforeIcon ? toRaw(props.beforeIcon) : undefined,
);
const afterIconComponent = computed(() =>
  props.afterIcon ? toRaw(props.afterIcon) : undefined,
);
const showUnit = computed(() => !showAfter.value && Boolean(slots.unit || props.unit));
const showButton = computed(() => !showAfter.value && !showUnit.value && Boolean(props.button));
const actionLabel = computed(
  () => props.actionAriaLabel || props.button || accessibleLabel.value || undefined,
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
  showFloatingLabel.value || props.loading ? '' : props.placeholder || props.labelText,
);

function commit(value: string): string {
  const next = sanitizeTextFieldValue(value, {
    amount: props.amount,
    isNumber: props.isNumber,
    maxLength: props.maxLength,
  });
  if (next !== props.modelValue) emit('update:modelValue', next);
  return next;
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const next = commit(target.value);
  if (target.value !== next) target.value = next;
  emit('input', event);
}

function onChange(event: Event) {
  syncNativeValue();
  emit('change', event);
}

function onKeydown(event: KeyboardEvent) {
  if (!restrictToDigits.value) return;
  if (!isDigitKey(event)) event.preventDefault();
}

function onFocus(event: FocusEvent) {
  focused.value = true;
  syncNativeValue();
  emit('focus', event);
}

function onBlur(event: FocusEvent) {
  focused.value = false;
  emit('blur', event);
}

function syncNativeValue() {
  const native = inputRef.value?.value ?? '';
  if (native === props.modelValue) return;
  commit(native);
}

function isAutofilled() {
  const input = inputRef.value;
  if (!input) return false;
  try {
    return input.matches(':autofill') || input.matches(':-webkit-autofill');
  } catch {
    return false;
  }
}

const autofillEmitted = ref(false);
let autofillTimer: ReturnType<typeof setInterval> | undefined;

function markAutofilled() {
  syncNativeValue();
  if (autofillEmitted.value) return;
  autofillEmitted.value = true;
  emit('autofill');
}

function detectAutofill() {
  if (isAutofilled()) markAutofilled();
  else syncNativeValue();
}

function onAnimationStart(event: AnimationEvent) {
  if (event.animationName !== 'tr-text-field-autofill') return;
  markAutofilled();
}

function nativeValue() {
  return inputRef.value?.value ?? props.modelValue;
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
  detectAutofill();
  autofillTimer = window.setInterval(detectAutofill, 100);
  window.setTimeout(() => {
    if (autofillTimer) window.clearInterval(autofillTimer);
  }, 2500);
});

onBeforeUnmount(() => {
  if (autofillTimer) window.clearInterval(autofillTimer);
});

defineExpose({
  inputRef,
  focus,
  nativeValue,
});
</script>

<template>
  <div class="tr-text-field" :class="rootClass" :style="rootStyle">
    <label v-if="accessibleLabel" class="tr-text-field__accessible-label" :for="fieldId">
      {{ accessibleLabel }}
    </label>

    <div
      class="tr-text-field__control"
      :class="{
        'is-disabled': isDisabled,
        'is-error': hasError,
        'is-loading': loading,
        'is-ltr': direction === 'ltr',
      }"
      :dir="direction"
    >

      <span v-if="showBefore" class="tr-text-field__adornment">
        <TrIcon>
          <slot name="before">
            <component :is="beforeIconComponent" />
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
          :value="autofillEmitted && !modelValue ? undefined : displayValue"
          :type="inputType"
          :disabled="disabled"
          :readonly="isReadonly || undefined"
          :placeholder="inputPlaceholder"
          :inputmode="inputMode"
          :maxlength="maxLength > 0 && !amount ? maxLength : undefined"
          :spellcheck="nativeSpellcheck"
          :aria-invalid="hasError || undefined"
          :aria-busy="loading || undefined"
          :aria-describedby="describedBy"
          :aria-errormessage="hasError && showHelper ? helperId : undefined"
          @input="onInput"
          @change="onChange"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
          @animationstart="onAnimationStart"
        />
      </div>

      <button
        v-if="showAfter"
        type="button"
        class="tr-text-field__adornment tr-text-field__adornment--action"
        :disabled="isDisabled"
        :aria-label="actionLabel"
        @click="onAction"
      >
        <TrIcon>
          <slot name="after">
            <component :is="afterIconComponent" />
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
        dir="rtl"
        role="status"
      >
        {{ words }}
      </div>
    </div>

    <Transition name="tr-text-field-label">
      <span
        v-if="showFloatingLabel"
        class="tr-text-field__label"
        aria-hidden="true"
      >
        {{ accessibleLabel }}
      </span>
    </Transition>

    <div v-if="showHelper || showLimit" class="tr-text-field__footer">
      <p
        v-if="showHelper"
        :id="helperId"
        class="tr-text-field__helper"
        :class="`tr-text-field__helper--${helper?.type}`"
        :role="helper?.type === 'error' ? 'alert' : 'status'"
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
        {{ displayValue.length }}/{{ maxLength }}
      </p>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId, watch } from 'vue';
import { sanitizeOtpValue, type TrOtpFieldProps } from './OtpField';

defineOptions({
  name: 'TrOtpField',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TrOtpFieldProps>(), {
  modelValue: '',
  codeLength: 6,
  disabled: false,
  autoFocus: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  complete: [value: string];
}>();

const generatedId = useId().replaceAll(':', '');
const fieldId = computed(() => props.id || props.name || `tr-otp-field-${generatedId}`);
const helperId = computed(() => `${fieldId.value}-helper`);

const digits = ref<string[]>([]);
const inputEls = ref<(HTMLInputElement | null)[]>([]);

const hasError = computed(() => props.helper?.type === 'error');
const helperMessage = computed(() => props.helper?.message?.trim() ?? '');
const showHelper = computed(() => Boolean(helperMessage.value && props.helper?.type));
const length = computed(() => Math.max(1, props.codeLength));

function syncFromModel(value: string) {
  const sanitized = sanitizeOtpValue(value, length.value);
  digits.value = Array.from({ length: length.value }, (_, index) => sanitized[index] ?? '');
}

function joined(): string {
  return digits.value.join('');
}

function commit(next: string, announceComplete = true) {
  const sanitized = sanitizeOtpValue(next, length.value);
  syncFromModel(sanitized);
  if (sanitized !== props.modelValue) emit('update:modelValue', sanitized);
  if (announceComplete && sanitized.length === length.value) emit('complete', sanitized);
}

function setInputRef(el: Element | null, index: number) {
  inputEls.value[index] = el instanceof HTMLInputElement ? el : null;
}

function focusAt(index: number) {
  const clamped = Math.min(Math.max(index, 0), length.value - 1);
  inputEls.value[clamped]?.focus();
}

function focus() {
  const empty = digits.value.findIndex((digit) => !digit);
  focusAt(empty === -1 ? 0 : empty);
}

function onInput(event: Event, index: number) {
  if (props.disabled) return;
  const input = event.target as HTMLInputElement;
  const incoming = sanitizeOtpValue(input.value, length.value);

  if (incoming.length > 1) {
    const prefix = joined().slice(0, index);
    commit(prefix + incoming);
    focusAt(Math.min(index + incoming.length, length.value - 1));
    return;
  }

  const next = [...digits.value];
  next[index] = incoming.charAt(0) ?? '';
  commit(next.join(''));

  if (next[index] && index < length.value - 1) {
    void nextTick(() => focusAt(index + 1));
  }
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (props.disabled) return;

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    focusAt(index - 1);
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    focusAt(index + 1);
    return;
  }

  if (event.key !== 'Backspace' && event.key !== 'Delete') return;

  event.preventDefault();
  const next = [...digits.value];

  if (next[index]) {
    next[index] = '';
    commit(next.join(''), false);
    return;
  }

  if (index > 0) {
    next[index - 1] = '';
    commit(next.join(''), false);
    void nextTick(() => focusAt(index - 1));
  }
}

function onPaste(event: ClipboardEvent) {
  if (props.disabled) return;
  event.preventDefault();
  const pasted = event.clipboardData?.getData('text') ?? '';
  commit(pasted);
  focusAt(Math.min(sanitizeOtpValue(pasted, length.value).length, length.value - 1));
}

function onFocus(event: FocusEvent) {
  (event.target as HTMLInputElement).select();
}

watch(
  () => [props.modelValue, length.value] as const,
  ([value]) => {
    if (sanitizeOtpValue(value, length.value) === joined()) return;
    syncFromModel(value);
  },
  { immediate: true },
);

onMounted(() => {
  if (props.autoFocus) focus();
});

defineExpose({
  focus,
});
</script>

<template>
  <div class="tr-otp-field">
    <div
      class="tr-otp-field__cells"
      role="group"
      dir="ltr"
      :aria-label="ariaLabel"
      :aria-describedby="showHelper ? helperId : undefined"
      :aria-invalid="hasError || undefined"
    >
      <input
        v-for="index in length"
        :id="index === 1 ? fieldId : `${fieldId}-${index}`"
        :key="index"
        :ref="(el) => setInputRef(el as Element | null, index - 1)"
        class="tr-otp-field__input"
        :class="{ 'is-error': hasError }"
        :name="index === 1 ? name : undefined"
        :value="digits[index - 1]"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="1"
        :disabled="disabled"
        :aria-label="`${index}`"
        @input="onInput($event, index - 1)"
        @keydown="onKeydown($event, index - 1)"
        @paste="onPaste"
        @focus="onFocus"
      />
    </div>

    <p
      v-if="showHelper"
      :id="helperId"
      class="tr-otp-field__helper"
      :class="`tr-otp-field__helper--${helper?.type}`"
      :role="helper?.type === 'error' ? 'alert' : 'status'"
    >
      <span v-if="helper?.type === 'error'" class="tr-otp-field__helper-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 1.5A6.5 6.5 0 1 0 14.5 8 6.51 6.51 0 0 0 8 1.5Zm-.75 3.25a.75.75 0 1 1 1.5 0v4a.75.75 0 1 1-1.5 0Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
          />
        </svg>
      </span>
      <span v-else-if="helper?.type === 'success'" class="tr-otp-field__helper-icon" aria-hidden="true">
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
  </div>
</template>

<style src="./styles.css"></style>

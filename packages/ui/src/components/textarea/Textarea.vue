<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { TrIcon } from '../icon';
import CircleCheckIcon from '../../icons/CircleCheckIcon.vue';
import InfoFillIcon from '../../icons/InfoFillIcon.vue';
import type { TrTextareaProps } from './Textarea';

defineOptions({ name: 'TrTextarea' });

const props = withDefaults(defineProps<TrTextareaProps>(), {
  placeholder: '',
  modelValue: '',
  label: true,
  disabled: false,
  loading: false,
  rows: 4,
  maxLength: 0,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputRef = ref<HTMLTextAreaElement>();
const showLabel = ref(false);

const floatingLabel = computed(() => props.labelText || props.placeholder);
const isDisabled = computed(() => props.disabled || props.loading);
const fieldId = computed(() => props.name || 'tr-textarea');
const helperMessage = computed(() => props.helper?.message?.trim() ?? '');
const showHelper = computed(() => Boolean(props.helper?.type && helperMessage.value));
const innerClass = computed(() => {
  if (props.helper?.type === 'error') return 'tr-textarea__inner--error';
  if (isDisabled.value) return 'tr-textarea__inner--disabled';
  return 'tr-textarea__inner--default';
});

function commit(value: string) {
  const next = props.maxLength > 0 ? value.slice(0, props.maxLength) : value;
  emit('update:modelValue', next);
}

function handleLabel(focused: boolean) {
  if (focused && floatingLabel.value && !props.loading && props.label) {
    showLabel.value = true;
    return;
  }
  if (!focused && !props.modelValue) showLabel.value = false;
}

function onFocus() {
  handleLabel(true);
}

function onBlur() {
  handleLabel(false);
}

function onInput(event: Event) {
  commit((event.target as HTMLTextAreaElement).value);
}

onMounted(() => {
  if (props.modelValue && floatingLabel.value && !props.loading && props.label) {
    showLabel.value = true;
  }
});

watch(
  () => props.modelValue,
  (next) => {
    if (next) handleLabel(true);
  },
);

defineExpose({ inputRef });
</script>

<template>
  <div class="tr-textarea">
    <div class="tr-textarea__inner" :class="innerClass">
      <Transition name="tr-textarea-label">
        <div v-if="showLabel" class="tr-textarea__label">
          <label class="tr-textarea__label-text" :for="fieldId" @click="inputRef?.focus()">
            {{ floatingLabel }}
          </label>
        </div>
      </Transition>
      <div class="tr-textarea__field">
        <span v-if="loading && !modelValue" class="tr-textarea__skeleton" aria-hidden="true" />
        <textarea
          :id="fieldId"
          ref="inputRef"
          class="tr-textarea__control"
          :value="modelValue"
          :name="name"
          :rows="rows"
          :disabled="disabled"
          :placeholder="!showLabel && !loading ? placeholder : ''"
          :readonly="loading || undefined"
          :maxlength="maxLength > 0 ? maxLength : undefined"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
        />
      </div>
    </div>
    <div class="tr-textarea__description">
      <div v-if="showHelper" class="tr-textarea__helper" :class="`tr-textarea__helper--${helper?.type}`">
        <TrIcon v-if="helper?.type === 'error'" size="sm">
          <InfoFillIcon />
        </TrIcon>
        <TrIcon v-else-if="helper?.type === 'success'" size="sm">
          <CircleCheckIcon />
        </TrIcon>
        {{ helperMessage }}
      </div>
      <div v-if="maxLength > 0" class="tr-textarea__limit">
        {{ maxLength }}/{{ modelValue.length || 0 }}
      </div>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

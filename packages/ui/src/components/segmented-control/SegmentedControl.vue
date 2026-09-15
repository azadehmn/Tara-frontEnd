<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import type {
  TrSegmentedControlOption,
  TrSegmentedControlProps,
  TrSegmentedControlValue,
} from './SegmentedControl';

defineOptions({ name: 'TrSegmentedControl' });

const props = withDefaults(defineProps<TrSegmentedControlProps>(), {
  size: 'small',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: TrSegmentedControlValue];
  change: [value: TrSegmentedControlValue];
}>();

const root = ref<HTMLElement | null>(null);

const enabledOptions = computed(() =>
  props.options.filter((option) => !isDisabled(option)),
);

function isDisabled(option: TrSegmentedControlOption): boolean {
  return props.disabled || Boolean(option.disabled);
}

function isTabStop(option: TrSegmentedControlOption): boolean {
  if (isDisabled(option)) return false;

  const selectedOption = props.options.find(
    (item) => item.value === props.modelValue && !isDisabled(item),
  );
  return selectedOption ? option.value === selectedOption.value : option === enabledOptions.value[0];
}

function select(option: TrSegmentedControlOption): void {
  if (isDisabled(option) || option.value === props.modelValue) return;
  emit('update:modelValue', option.value);
  emit('change', option.value);
}

function onKeydown(event: KeyboardEvent, option: TrSegmentedControlOption): void {
  const currentIndex = enabledOptions.value.indexOf(option);
  if (currentIndex < 0) return;

  const rtl = document.documentElement.dir === 'rtl';
  let nextIndex: number | undefined;

  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = enabledOptions.value.length - 1;
  if (event.key === 'ArrowDown') nextIndex = currentIndex + 1;
  if (event.key === 'ArrowUp') nextIndex = currentIndex - 1;
  if (event.key === 'ArrowRight') nextIndex = currentIndex + (rtl ? -1 : 1);
  if (event.key === 'ArrowLeft') nextIndex = currentIndex + (rtl ? 1 : -1);
  if (nextIndex === undefined || enabledOptions.value.length === 0) return;

  event.preventDefault();
  const nextOption =
    enabledOptions.value[
      (nextIndex + enabledOptions.value.length) % enabledOptions.value.length
    ];
  if (!nextOption) return;

  select(nextOption);
  void nextTick(() => {
    const optionIndex = props.options.indexOf(nextOption);
    root.value?.querySelectorAll<HTMLButtonElement>('.tr-segmented-control__option')[
      optionIndex
    ]?.focus();
  });
}
</script>

<template>
  <div
    ref="root"
    class="tr-segmented-control"
    :class="`tr-segmented-control--${size}`"
    role="radiogroup"
    :aria-label="label"
    aria-orientation="horizontal"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="tr-segmented-control__option"
      :class="{ 'is-selected': option.value === modelValue }"
      role="radio"
      :aria-checked="option.value === modelValue"
      :disabled="isDisabled(option)"
      :tabindex="isTabStop(option) ? 0 : -1"
      @click="select(option)"
      @keydown="onKeydown($event, option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style src="./styles.css"></style>

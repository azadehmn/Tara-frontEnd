<script setup lang="ts">
import type { TrTabItem, TrTabProps } from './Tab';

defineOptions({ name: 'TrTab' });

const props = withDefaults(defineProps<TrTabProps>(), {
  align: 'end',
  block: false,
  hasBorder: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function select(item: TrTabItem) {
  if (item.loading || item.value === props.modelValue) return;
  emit('update:modelValue', item.value);
}

function showCount(item: TrTabItem): boolean {
  return typeof item.count === 'number' && item.count > 0;
}
</script>

<template>
  <div
    class="tr-tab"
    :class="[block ? 'tr-tab--block' : `tr-tab--${align}`, { 'tr-tab--border': hasBorder }]"
    role="tablist"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      class="tr-tab__button"
      :class="{
        'is-active': item.value === modelValue && !item.loading,
        'tr-tab__button--block': block,
      }"
      role="tab"
      :aria-selected="item.value === modelValue"
      :disabled="item.loading"
      @click="select(item)"
    >
      <span v-if="item.loading" class="tr-tab__skeleton" />
      <span v-else class="tr-tab__label">
        <span v-if="item.icon" class="tr-tab__icon">
          <slot name="icon" :item="item" />
          <span v-if="showCount(item)" class="tr-tab__count">{{ item.count }}</span>
        </span>
        {{ item.label }}
        <span v-if="item.isNotif" class="tr-tab__dot" />
      </span>
    </button>
  </div>
</template>

<style src="./styles.css"></style>

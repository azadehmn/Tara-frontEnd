<script setup lang="ts" generic="T extends TrTableRow">
import { computed, useSlots } from 'vue';
import {
  columnSlotName,
  itemSlotName,
  itemTextContent,
  rowClassName,
  rowIdentity,
  type TrTableProps,
  type TrTableRow,
  type TrTableRowHoverPayload,
} from './Table';

defineOptions({ name: 'Tr-Table' });

const props = withDefaults(defineProps<TrTableProps<T>>(), {
  items: () => [],
  loading: false,
  loadingRowCount: 5,
  hideHeader: false,
  rowPointer: false,
  emptyText: '',
  rowKey: 'id',
  actionWidth: '48px',
});

const emit = defineEmits<{
  rowClick: [item: T];
  rowHover: [payload: TrTableRowHoverPayload<T>];
}>();

const slots = useSlots();

const hasActionSlot = computed(() => Boolean(slots.action));

const itemSlots = computed(() => new Set(Object.keys(slots)));

const gridTemplate = computed(() => {
  const tracks = props.columns.map((column) => column.width ?? 'minmax(100px, 1fr)');
  if (hasActionSlot.value) tracks.push(props.actionWidth);
  return tracks.join(' ');
});

const skeletonRows = computed(() =>
  Array.from({ length: Math.max(1, props.loadingRowCount) }, (_, index) => index),
);

function onRowClick(item: T) {
  emit('rowClick', item);
}

function onRowHover(item: T, index: number, hovering: boolean) {
  emit('rowHover', { item, index, hovering });
}
</script>

<template>
  <div class="tr-table" role="table">
    <div
      v-if="!hideHeader"
      class="tr-table__head"
      role="row"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div
        v-for="column in columns"
        :key="column.id ?? column.name"
        class="tr-table__head-cell"
        :class="column.class"
        role="columnheader"
      >
        <slot v-if="itemSlots.has(columnSlotName(column))" :name="columnSlotName(column)" :column="column">
          {{ column.label }}
        </slot>
        <template v-else>{{ column.label }}</template>
      </div>
      <div
        v-if="hasActionSlot"
        class="tr-table__head-cell tr-table__head-cell--action"
        role="columnheader"
      />
    </div>

    <div v-if="loading">
      <slot name="loading">
        <div
          v-for="rowIndex in skeletonRows"
          :key="`skeleton-${rowIndex}`"
          class="tr-table__row"
          role="row"
          :style="{ gridTemplateColumns: gridTemplate }"
        >
          <div v-for="column in columns" :key="column.id ?? column.name" class="tr-table__cell" role="cell">
            <span class="tr-table__skeleton" aria-hidden="true" />
          </div>
          <div v-if="hasActionSlot" class="tr-table__cell tr-table__cell--action" role="cell">
            <span class="tr-table__skeleton" aria-hidden="true" />
          </div>
        </div>
      </slot>
    </div>

    <template v-else-if="items.length > 0">
      <div
        v-for="(item, index) in items"
        :key="rowIdentity(item, index, rowKey)"
        class="tr-table__row"
        :class="[rowClassName(item), { 'tr-table__row--pointer': rowPointer }]"
        role="row"
        :tabindex="rowPointer ? 0 : undefined"
        :style="{ gridTemplateColumns: gridTemplate }"
        @click="onRowClick(item)"
        @keydown.enter.prevent="onRowClick(item)"
        @mouseenter="onRowHover(item, index, true)"
        @mouseleave="onRowHover(item, index, false)"
      >
        <div
          v-for="column in columns"
          :key="column.id ?? column.name"
          class="tr-table__cell"
          role="cell"
        >
          <slot
            v-if="itemSlots.has(itemSlotName(column))"
            :name="itemSlotName(column)"
            :item="item"
            :column="column"
            :index="index"
          />
          <div v-else class="truncate">
            {{ itemTextContent(column.name, item) }}
          </div>
        </div>
        <div
          v-if="hasActionSlot"
          class="tr-table__cell tr-table__cell--action"
          role="cell"
          @click.stop
        >
          <slot name="action" :item="item" :index="index" />
        </div>
      </div>
    </template>

    <div v-else class="tr-table__empty" role="status">
      <slot name="empty">{{ emptyText }}</slot>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

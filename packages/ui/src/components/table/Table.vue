<script setup lang="ts" generic="T extends TrTableRow">
import { computed } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { TrEmptyState } from '../empty-state';
import { TrTooltip } from '../tooltip';
import TrTableCard from './TableCard.vue';
import {
  itemTextContent,
  getRowKey,
  toTableSlotColumn,
  type TrTableProps,
  type TrTableRow,
  type TrTableRowHoverPayload,
  type TrTableSlotColumn,
} from './Table';

defineOptions({ name: 'TrTable' });

const props = withDefaults(defineProps<TrTableProps<T>>(), {
  items: () => [],
  loading: false,
  loadingRowCount: 5,
  hideHeader: false,
  rowPointer: false,
  title: '',
  emptyDescription: '',
  vector: 'EmptyPaper',
  rowKey: 'id',
  actionWidth: '48px',
  layout: 'auto',
  cardBreakpoint: 'lg',
  showCardHeaderLabel: false,
});

const emit = defineEmits<{
  rowClick: [item: T];
  rowHover: [payload: TrTableRowHoverPayload<T>];
}>();

const slots = defineSlots<
  {
    action?: (props: { item: T; index: number }) => unknown;
    loading?: () => unknown;
    empty?: () => unknown;
    card?: (props: { item: T; index: number }) => unknown;
    'card-header'?: (props: {
      item: T;
      column: TrTableSlotColumn;
      addonColumn?: TrTableSlotColumn;
      index: number;
    }) => unknown;
    'card-main'?: (props: {
      item: T;
      columns: TrTableSlotColumn[];
      index: number;
    }) => unknown;
    'card-footer'?: (props: { item: T; index: number }) => unknown;
  }
  & {
    [name in `column-${string}`]?: (props: { column: TrTableSlotColumn }) => unknown;
  }
  & {
    [name in `item-${string}`]?: (props: {
      item: T;
      column: TrTableSlotColumn;
      index: number;
    }) => unknown;
  }
>();
const { isBelow } = useBreakpoint();

const hasActionSlot = computed(() => Boolean(slots.action));
const itemSlots = computed(() => new Set(Object.keys(slots)));
const hasCardSlot = computed(() => itemSlots.value.has('card'));
const hasCardFooterSlot = computed(() => itemSlots.value.has('card-footer'));

const showCards = computed(() => {
  if (props.layout === 'card') return true;
  if (props.layout === 'table') return false;
  return isBelow(props.cardBreakpoint);
});

const normalizedColumns = computed((): TrTableSlotColumn[] =>
  props.columns.map(toTableSlotColumn),
);

const headerColumn = computed((): TrTableSlotColumn | undefined => {
  if (props.cardHeaderColumn) {
    return (
      normalizedColumns.value.find(
        (column: TrTableSlotColumn) => column.name === props.cardHeaderColumn,
      ) ?? normalizedColumns.value[0]
    );
  }
  return normalizedColumns.value[0];
});

const headerAddonColumn = computed((): TrTableSlotColumn | undefined => {
  if (!props.cardHeaderAddonColumn) return undefined;
  if (props.cardHeaderAddonColumn === headerColumn.value?.name) return undefined;
  return normalizedColumns.value.find(
    (column: TrTableSlotColumn) => column.name === props.cardHeaderAddonColumn,
  );
});

const fieldColumns = computed((): TrTableSlotColumn[] =>
  normalizedColumns.value.filter((column: TrTableSlotColumn) => {
    if (column.name === headerColumn.value?.name) return false;
    if (column.name === headerAddonColumn.value?.name) return false;
    return true;
  }),
);

const gridColumns = computed(() => {
  const tracks = normalizedColumns.value.map(
    (column: TrTableSlotColumn) => column.width ?? 'minmax(100px, 1fr)',
  );
  if (hasActionSlot.value) tracks.push(props.actionWidth);
  return tracks.join(' ');
});

const loadingRows = computed(() =>
  Array.from({ length: Math.max(1, props.loadingRowCount) }, (_, index) => index),
);

const displayItems = computed(() => props.items ?? []);
const hasRows = computed(() => displayItems.value.length > 0);

function onRowClick(item: T) {
  emit('rowClick', item);
}

function onRowHover(item: T, index: number, hovering: boolean) {
  emit('rowHover', { item, index, hovering });
}

function cardHeaderTitle(column: TrTableSlotColumn, item: T): string {
  const value = itemTextContent(column.name, item);
  if (!props.showCardHeaderLabel || !column.label) return value;
  if (!value) return column.label;
  return `${column.label} ${value}`;
}
</script>

<template>
  <div v-if="showCards" class="tr-table-cards" role="list">
    <template v-if="loading">
      <slot name="loading">
        <TrTableCard
          v-for="rowIndex in loadingRows"
          :key="`skeleton-card-${rowIndex}`"
          role="listitem"
        >
          <template #header>
            <div class="tr-table-card__header-row">
              <div class="tr-table-card__header-main">
                <span class="tr-table__skeleton" aria-hidden="true" />
                <span v-if="headerAddonColumn" class="tr-table__skeleton" aria-hidden="true" />
              </div>
              <span v-if="hasActionSlot" class="tr-table__skeleton" aria-hidden="true" />
            </div>
          </template>
          <template #main>
            <div v-for="column in fieldColumns" :key="column.id ?? column.name" class="tr-table-card__field">
              <span class="tr-table-card__field-label">{{ column.label }}</span>
              <span class="tr-table__skeleton" aria-hidden="true" />
            </div>
          </template>
        </TrTableCard>
      </slot>
    </template>

    <template v-else-if="hasRows">
      <TrTableCard
        v-for="(item, index) in displayItems"
        :key="getRowKey(item, index, rowKey)"
        role="listitem"
        :class="[rowClass?.(item), { 'tr-table-card--pointer': rowPointer }]"
        :tabindex="rowPointer ? 0 : undefined"
        @click="onRowClick(item)"
        @keydown.enter.prevent="onRowClick(item)"
        @keydown.space.prevent="onRowClick(item)"
        @mouseenter="onRowHover(item, index, true)"
        @mouseleave="onRowHover(item, index, false)"
      >
        <template v-if="hasCardSlot">
          <slot name="card" :item="item" :index="index" />
        </template>
        <template v-if="!hasCardSlot && headerColumn" #header>
          <div class="tr-table-card__header-row">
            <div class="tr-table-card__header-main">
              <slot
                name="card-header"
                :item="item"
                :column="headerColumn"
                :addon-column="headerAddonColumn"
                :index="index"
              >
                <div class="tr-table-card__header-title">
                  <span v-if="showCardHeaderLabel && itemSlots.has(headerColumn.itemSlot)" class="tr-table-card__header-prefix">
                    {{ headerColumn.label }}
                  </span>
                  <slot
                    v-if="itemSlots.has(headerColumn.itemSlot)"
                    :name="headerColumn.itemSlot"
                    :item="item"
                    :column="headerColumn"
                    :index="index"
                  />
                  <TrTooltip
                    v-else
                    class="tr-table__overflow-text"
                    :content="cardHeaderTitle(headerColumn, item)"
                    only-when-truncated
                    stop-trigger-click
                  >
                    {{ cardHeaderTitle(headerColumn, item) }}
                  </TrTooltip>
                </div>
                <div v-if="headerAddonColumn" class="tr-table-card__header-addon">
                  <slot
                    v-if="itemSlots.has(headerAddonColumn.itemSlot)"
                    :name="headerAddonColumn.itemSlot"
                    :item="item"
                    :column="headerAddonColumn"
                    :index="index"
                  />
                  <TrTooltip
                    v-else
                    class="tr-table__overflow-text"
                    :content="itemTextContent(headerAddonColumn.name, item)"
                    only-when-truncated
                    stop-trigger-click
                  >
                    {{ itemTextContent(headerAddonColumn.name, item) }}
                  </TrTooltip>
                </div>
              </slot>
            </div>
            <div v-if="hasActionSlot" class="tr-table-card__header-action" @click.stop>
              <slot name="action" :item="item" :index="index" />
            </div>
          </div>
        </template>
        <template v-if="!hasCardSlot && fieldColumns.length > 0" #main>
          <slot name="card-main" :item="item" :index="index" :columns="fieldColumns">
            <div
              v-for="column in fieldColumns"
              :key="column.id ?? column.name"
              class="tr-table-card__field"
            >
              <span class="tr-table-card__field-label">{{ column.label }}</span>
              <div class="tr-table-card__field-value">
                <slot
                  v-if="itemSlots.has(column.itemSlot)"
                  :name="column.itemSlot"
                  :item="item"
                  :column="column"
                  :index="index"
                />
                <TrTooltip
                  v-else
                  class="tr-table__overflow-text"
                  :content="itemTextContent(column.name, item)"
                  only-when-truncated
                  stop-trigger-click
                >
                  {{ itemTextContent(column.name, item) }}
                </TrTooltip>
              </div>
            </div>
          </slot>
        </template>
        <template v-if="!hasCardSlot && hasCardFooterSlot" #footer>
          <slot name="card-footer" :item="item" :index="index" />
        </template>
      </TrTableCard>
    </template>

    <div v-else class="tr-table__empty" role="status">
      <slot name="empty">
        <TrEmptyState
          :vector="vector"
          :title="title"
          :description="emptyDescription"
        />
      </slot>
    </div>
  </div>

  <div v-else class="tr-table" role="table">
    <div
      v-if="!hideHeader"
      class="tr-table__head"
      role="row"
      :style="{ gridTemplateColumns: gridColumns }"
    >
      <div
        v-for="column in normalizedColumns"
        :key="column.id ?? column.name"
        class="tr-table__head-cell"
        :class="column.class"
        role="columnheader"
      >
        <slot v-if="itemSlots.has(column.columnSlot)" :name="column.columnSlot" :column="column">
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
          v-for="rowIndex in loadingRows"
          :key="`skeleton-${rowIndex}`"
          class="tr-table__row"
          role="row"
          :style="{ gridTemplateColumns: gridColumns }"
        >
          <div v-for="column in normalizedColumns" :key="column.id ?? column.name" class="tr-table__cell" role="cell">
            <span class="tr-table__skeleton" aria-hidden="true" />
          </div>
          <div v-if="hasActionSlot" class="tr-table__cell tr-table__cell--action" role="cell">
            <span class="tr-table__skeleton" aria-hidden="true" />
          </div>
        </div>
      </slot>
    </div>

    <template v-else-if="hasRows">
      <div
        v-for="(item, index) in displayItems"
        :key="getRowKey(item, index, rowKey)"
        class="tr-table__row"
        :class="[rowClass?.(item), { 'tr-table__row--pointer': rowPointer }]"
        role="row"
        :tabindex="rowPointer ? 0 : undefined"
        :style="{ gridTemplateColumns: gridColumns }"
        @click="onRowClick(item)"
        @keydown.enter.prevent="onRowClick(item)"
        @keydown.space.prevent="onRowClick(item)"
        @mouseenter="onRowHover(item, index, true)"
        @mouseleave="onRowHover(item, index, false)"
      >
        <div
          v-for="column in normalizedColumns"
          :key="column.id ?? column.name"
          class="tr-table__cell"
          role="cell"
        >
          <div class="tr-table__cell-content">
            <slot
              v-if="itemSlots.has(column.itemSlot)"
              :name="column.itemSlot"
              :item="item"
              :column="column"
              :index="index"
            />
            <TrTooltip
              v-else
              class="tr-table__overflow-text"
              :content="itemTextContent(column.name, item)"
              only-when-truncated
              stop-trigger-click
            >
              {{ itemTextContent(column.name, item) }}
            </TrTooltip>
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
      <slot name="empty">
        <TrEmptyState
          :vector="vector"
          :title="title"
          :description="emptyDescription"
        />
      </slot>
    </div>
  </div>
</template>

<style src="./styles.css"></style>

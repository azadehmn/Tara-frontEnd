# TrTable

Type-safe data table for Tara UI. Pass `columns` and `items`; customize cells with slots. Keep API and business logic in the feature, not in this component.

## Features

- Generic row type (`T extends Record<string, unknown>`)
- Nested fields (`wallet.title`)
- Custom header and cell slots
- Optional action column
- Loading rows and empty state
- Row click / hover, custom `rowKey` and `rowClass`
- CSS Grid column widths
- Keyboard: Enter and Space when `rowPointer` is set

## Usage

```vue
<script setup lang="ts">
import { TrTable, type TrTableColumn } from '@tara/ui';

const columns: TrTableColumn[] = [
  { name: 'id', label: 'Id', width: '120px' },
  { name: 'title', label: 'Title' },
  { name: 'wallet.title', label: 'Wallet', width: 'minmax(140px, 1fr)' },
  { name: 'status', label: 'Status' },
];
</script>

<template>
  <TrTable
    :columns="columns"
    :items="items"
    :loading="pending"
    empty-text="No rows"
    row-key="id"
    row-pointer
    :row-class="(item) => (item.disabled ? 'is-disabled' : undefined)"
    @row-click="handleRowClick"
  >
    <template #item-status="{ item }">
      {{ item.status }}
    </template>
    <template #action="{ item }">
      <button type="button" @click.stop="editItem(item)">Edit</button>
    </template>
  </TrTable>
</template>
```

`#action` adds a trailing column. Use `@click.stop` inside it so the row click does not fire.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `TrTableColumn[]` | — | Column definitions |
| `items` | `T[]` | `[]` | Rows |
| `loading` | `boolean` | `false` | Show loading rows instead of data |
| `loadingRowCount` | `number` | `5` | Loading row count |
| `hideHeader` | `boolean` | `false` | Hide header row |
| `rowPointer` | `boolean` | `false` | Pointer cursor, `tabindex`, Enter/Space → `rowClick` |
| `emptyText` | `string` | `''` | Fallback when `items` is empty |
| `rowKey` | `string` | `'id'` | Vue `:key` field; falls back to index |
| `rowClass` | `(item: T) => string \| undefined` | — | Row class from the UI, not from the data model |
| `actionWidth` | `string` | `'48px'` | Grid track for `#action` |

### Column

| Field | Description |
| --- | --- |
| `name` | Field path (`wallet.title` is allowed) |
| `label` | Header text |
| `id` | Stable id; defaults to `name` |
| `width` | CSS Grid track: `120px`, `1fr`, `minmax(140px, 1fr)` |
| `class` | Header cell class |

## Events

| Event | Payload |
| --- | --- |
| `rowClick` | `item` |
| `rowHover` | `{ item, index, hovering }` |

## Slots

Slot names use `column.name` in lowercase (`isEnabled` → `#item-isenabled`).

| Slot | Args | Purpose |
| --- | --- | --- |
| `#column-{name}` | `{ column }` | Custom header |
| `#item-{name}` | `{ item, column, index }` | Custom cell |
| `#action` | `{ item, index }` | Trailing actions |
| `#loading` | — | Replace default loading rows |
| `#empty` | — | Replace `emptyText` |

Without `#item-*`, the cell text comes from `name` via `resolvePathValue`.

## Notes

- Keep fetch, filters, and commands outside `TrTable`.
- Prefer a stable `rowKey`.
- Optional helpers from `@tara/ui`: `resolvePathValue`, `itemTextContent`, `getRowKey`, `columnSlotName`, `itemSlotName`.

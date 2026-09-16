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
- Responsive cards below `md` (768px) by default, using the same columns and `#item-*` / `#action` slots

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
| `layout` | `'auto' \| 'table' \| 'card'` | `'auto'` | `auto` switches to cards below `cardBreakpoint` |
| `cardBreakpoint` | Tara breakpoint name | `'md'` | Token used when `layout` is `auto` (`md` = 768px) |
| `cardHeaderColumn` | `string` | first column | Column `name` shown in the card header |

Below `cardBreakpoint`, each row becomes a `TrTableCard`: first column (or `cardHeaderColumn`) in the header, remaining columns as label/value rows, `#action` in the footer. Existing `#item-*` slots are reused. Override with `#card`, `#card-header`, `#card-main`, or `#card-footer`. Force a mode with `layout="table"` or `layout="card"`.

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
| `#card` | `{ item, index }` | Replace the whole card body |
| `#card-header` | `{ item, column, index }` | Replace the card header |
| `#card-main` | `{ item, index, columns }` | Replace the card fields |
| `#card-footer` | `{ item, index }` | Replace the card footer |

Without `#item-*`, the cell text comes from `name` via `resolvePathValue`.

## Notes

- Keep fetch, filters, and commands outside `TrTable`.
- Prefer a stable `rowKey`.
- Optional helpers from `@tara/ui`: `resolvePathValue`, `itemTextContent`, `getRowKey`, `columnSlotName`, `itemSlotName`.

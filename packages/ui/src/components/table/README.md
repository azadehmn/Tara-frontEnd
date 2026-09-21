# TrTable

Type-safe data table for Tara UI. Pass `columns` and `items`; customize cells with slots. Keep API and business logic in the feature, not in this component.

## Features

- Generic row type (`T extends Record<string, unknown>`)
- Nested fields (`wallet.title`)
- Custom header and cell slots
- Optional action column
- Loading rows and empty state (`items.length === 0`)
- Row click / hover, custom `rowKey` and `rowClass`
- CSS Grid column widths
- Keyboard: Enter and Space when `rowPointer` is set
- Responsive cards below `lg` (912px) by default, using the same columns and `#item-*` / `#action` slots

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
    title="No rows"
    vector="EmptyPaper"
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
| `title` | `string` | `''` | Empty-state title |
| `emptyDescription` | `string` | `''` | Empty-state supporting copy |
| `vector` | `string` | `'EmptyPaper'` | Vector filename passed to `TrEmptyState` |
| `rowKey` | `string` | `'id'` | Vue `:key` field; falls back to index |
| `rowClass` | `(item: T) => string \| undefined` | — | Row class from the UI, not from the data model |
| `actionWidth` | `string` | `'48px'` | Grid track for `#action` |
| `layout` | `'auto' \| 'table' \| 'card'` | `'auto'` | `auto` switches to cards below `cardBreakpoint` |
| `cardBreakpoint` | Tara breakpoint name | `'lg'` | Token used when `layout` is `auto` (`lg` = 912px) |
| `cardHeaderColumn` | `string` | first column | Column `name` shown in the card header |
| `showCardHeaderLabel` | `boolean` | `false` | Prefix the card header value with the column `label` (inline title, e.g. `شماره قرارداد 1134`) |
| `cardHeaderAddonColumn` | `string` | — | Extra column (usually status) on the start/right of the card header; hidden from field rows |

Below `cardBreakpoint`, each row becomes a `TrTableCard`: first column (or `cardHeaderColumn`) in the header, remaining columns as label/value rows. `#action` sits on the end/left of the header so cards stay shorter. Existing `#item-*` slots are reused. Set `showCardHeaderLabel` to prefix the header value with its column title, and `cardHeaderAddonColumn` to pin another column (for example status) next to that title. Override with `#card`, `#card-header`, `#card-main`, or `#card-footer`. Force a mode with `layout="table"` or `layout="card"`.

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
| `#action` | `{ item, index }` | Trailing actions (header end/left on cards) |
| `#loading` | — | Replace default loading rows |
| `#empty` | — | Replace the default `TrEmptyState` |
| `#card` | `{ item, index }` | Replace the whole card body |
| `#card-header` | `{ item, column, addonColumn, index }` | Replace the card header title area |
| `#card-main` | `{ item, index, columns }` | Replace the card fields |
| `#card-footer` | `{ item, index }` | Optional card footer |

Without `#item-*`, the cell text comes from `name` via `resolvePathValue`.

## Notes

- Keep fetch, filters, and commands outside `TrTable`.
- Prefer a stable `rowKey`.
- Body and header cells truncate to one line; hover on desktop or tap on touch devices to see the full value.
- Optional helpers from `@tara/ui`: `resolvePathValue`, `itemTextContent`, `getRowKey`, `columnSlotName`, `itemSlotName`.

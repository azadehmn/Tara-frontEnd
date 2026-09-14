# TrAction

Three-dot action menu, mostly used for table rows.

It opens on click and closes after selecting an action, clicking outside, or pressing `Escape`.

## Usage

```vue
<script setup lang="ts">
import { TrAction, type TrActionItem } from '@tara/ui';
import CircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import DetailsIcon from '@tara/ui/icons/DetailsIcon.vue';

const items: TrActionItem[] = [
  {
    id: 'details',
    label: 'Details',
    icon: DetailsIcon,
    command: () => openDetails(),
  },
  {
    id: 'deactivate',
    label: 'Deactivate',
    icon: CircleSlashIcon,
    tone: 'danger',
    command: () => deactivate(),
  },
];
</script>

<template>
  <TrAction :items="items" aria-label="Actions" />
</template>
```

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `items` | `TrActionItem[]` | `[]` |
| `ariaLabel` | `string` | `'Actions'` |

## Action Item

| Field | Type |
| --- | --- |
| `id` | `string \| number` |
| `label` | `string` |
| `command` | `() => void` |
| `disabled` | `boolean` |
| `active` | `boolean` |
| `icon` | `Component` |
| `iconClass` | `string` |
| `itemClass` | `string` |
| `tone` | `'danger' \| 'success'` |

`active: false` hides the item and `disabled: true` keeps it visible but disabled.

Keep the action logic in the feature and only pass the actions to `TrAction`.
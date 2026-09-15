# TrStatus

Inline status chip: label, optional dot, optional icon. Use it in table cells for active / inactive / warning states.

```vue
<script setup lang="ts">
import { TrStatus } from '@tara/ui';
</script>

<template>
  <TrStatus type="positive" text="Active" dot />
  <TrStatus type="negative" text="Inactive" dot />
</template>
```

`type` values: `neutral` | `informative` | `warning` | `negative` | `positive`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `TrStatusType` | — | Semantic color |
| `text` | `string` | `''` | Label. Omit for an icon-only chip |
| `dot` | `boolean` | `false` | 8px status dot |
| `icon` | `Component` | — | Optional trailing icon |
| `iconClass` | `string` | — | Extra class on the icon wrapper |

Icon-only (`icon` without `text`) uses a circular compact padding.

Neutral uses `surface-pressed`. Positive uses `surface-success` (`#E0FFF5`) with `text-success` (`#248061`). Other types use the semantic text color at 15% (20% in dark).

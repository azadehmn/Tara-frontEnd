# TrLabel

Small, non-interactive label for categories and short metadata.

```vue
<script setup lang="ts">
import { TrLabel } from '@tara/ui';
</script>

<template>
  <TrLabel type="positive" text="موفق" />
  <TrLabel type="negative" size="medium" text="ناموفق" />
  <TrLabel type="outlined" radius="full" text="برچسب" />
</template>
```

Types: `neutral`, `informative`, `negative`, `warning`, `primary`, `outlined`, `positive`.

Sizes: `small` (default), `medium`.

Radius: `sm` (default), `md`, `full`.

Width: `fit` (default), `full`.

The `text` prop accepts a string or number, including `0`.

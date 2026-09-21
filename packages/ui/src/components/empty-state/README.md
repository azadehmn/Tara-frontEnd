# TrEmptyState

Placeholder when a list or table has no rows. Illustration comes from `vector/` by filename, same as icons.

```vue
<script setup lang="ts">
import { TrEmptyState } from '@tara/ui';
import EmptyPaper from '@tara/ui/vectors/EmptyPaper.vue';
</script>

<template>
  <TrEmptyState vector="EmptyPaper" title="موردی یافت نشد" />

  <!-- or import the Vue file like an icon -->
  <TrEmptyState title="موردی یافت نشد">
    <template #media>
      <EmptyPaper class="tr-empty-state__illustration" />
    </template>
  </TrEmptyState>
</template>
```

Add a new drawing as `vector/MyEmpty.vue` and pass `vector="MyEmpty"`. If `MyEmptyDark.vue` exists, dark theme uses it automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `vector` | `string` | `'EmptyPaper'` | Vector filename without `.vue` |
| `title` | `string` | `''` | Heading under the illustration |
| `description` | `string` | `''` | Supporting copy |

## Slots

| Slot | Purpose |
| --- | --- |
| `#media` | Replace the named vector |
| `#action` | Buttons under the copy |

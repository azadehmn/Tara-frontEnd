# TrSegmentedControl

Mutually exclusive selection between a small set of related options.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { TrSegmentedControl } from '@tara/ui';

const period = ref('MONTHLY');
const options = [
  { value: 'MONTHLY', label: 'ماهانه' },
  { value: 'WEEKLY', label: 'هفتگی' },
];
</script>

<template>
  <TrSegmentedControl
    v-model="period"
    :options="options"
    label="بازه زمانی"
  />
</template>
```

The component uses a radio-group accessibility model. Arrow keys, Home, and End move selection
and focus. The root accepts ordinary classes, so `class="w-full"` makes all options share the
available width.

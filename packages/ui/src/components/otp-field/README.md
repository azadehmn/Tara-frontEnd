# TrOtpField

Digit cells for one-time codes. Keep validation in the feature; pass the result through `helper`.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { TrOtpField } from '@tara/ui';

const code = ref('');
</script>

<template>
  <TrOtpField v-model="code" name="otp" :code-length="6" @complete="console.log" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Joined digits |
| `codeLength` | `number` | `6` | Number of cells |
| `name` | `string` | — | Native name on the first cell |
| `id` | `string` | generated | Native id on the first cell |
| `disabled` | `boolean` | `false` | Disable all cells |
| `autoFocus` | `boolean` | `false` | Focus the first empty cell on mount |
| `helper` | `{ type, message }` | — | `error` / `success` / `info` under the cells |
| `ariaLabel` | `string` | — | Accessible name for the group |

Persian / Arabic digits are converted to English. Paste fills from the first cell.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | v-model |
| `complete` | `string` | All cells filled |

Exposed: `focus()`.

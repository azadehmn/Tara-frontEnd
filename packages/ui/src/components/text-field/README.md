# TrTextField

Text input with a floating label, helper text, optional amount formatting, and trailing
unit / icon / button. Keep validation in the feature; pass the result through `helper`.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { TrTextField } from '@tara/ui';

const title = ref('');
</script>

<template>
  <TrTextField v-model="title" name="title" placeholder="عنوان" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Input value |
| `name` | `string` | — | Native name; used as id when `id` is omitted |
| `id` | `string` | generated | Native id |
| `placeholder` | `string` | `''` | Placeholder, and floating label text when `label` is true |
| `label` | `boolean` | `true` | Float `placeholder` on focus or when the field has a value |
| `disabled` | `boolean` | `false` | Disable the field |
| `loading` | `boolean` | `false` | Skeleton overlay; input is read-only |
| `autoFocus` | `boolean` | `false` | Focus on mount |
| `isNumber` | `boolean` | `false` | Digits only, `inputmode="numeric"` |
| `amount` | `boolean` | `false` | Group thousands; show Persian words while focused |
| `isLtr` | `boolean` | `false` | Force LTR on the control |
| `inputClass` | `string` | `''` | Extra class on the native input |
| `maxLength` | `number` | `0` | Limit; shows `max/current` unless `amount` is set |
| `helper` | `{ type, message }` | — | `error` / `success` / `info` under the field |
| `unit` | `string` | — | Trailing unit |
| `button` | `string` | — | Trailing action button |
| `beforeIcon` | `Component` | — | Leading icon |
| `afterIcon` | `Component` | — | Trailing icon; click emits `action` |

Native attributes (`type`, `autocomplete`, `readonly`, …) fall through to the input.
Root `class` / `style` stay on the wrapper.

Trailing adornments: `#after` / `afterIcon`, then `unit` / `#unit`, then `button`.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | v-model |
| `action` | — | Trailing icon or button |

## Slots

| Slot | Purpose |
| --- | --- |
| `#before` | Leading icon |
| `#after` | Trailing icon (clickable) |
| `#unit` | Custom unit |

Exposed: `inputRef`, `focus()`.

Persian / Arabic digits are converted to English. `amount` and `isNumber` also
block non-digit keys and sanitize paste.

Helpers `toEnNumber`, `formatAmount`, `sanitizeTextFieldValue`, `toPersianWords`,
and `amountInWords` are exported from `@tara/ui`.

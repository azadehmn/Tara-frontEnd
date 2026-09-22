# TrInlineMessage

Inline notice for help, warning, or status copy. Use it above a form or page section instead of a plain card.

```vue
<script setup lang="ts">
import { TrInlineMessage } from '@tara/ui';
</script>

<template>
  <TrInlineMessage type="informative" description="Help text for this page." />
  <TrInlineMessage type="warning" title="Attention" description="Check the values." dismissible />
</template>
```

`type` values: `neutral` | `informative` | `warning` | `negative` | `positive`

Improvements vs the original kit: document direction is inherited (no hardcoded RTL), `positive` is a first-class type, the type is reactive, each type has its own icon, dismiss emits `dismiss`, and loading uses the kit skeleton tokens.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `TrInlineMessageType` | `'neutral'` | Semantic color and default icon |
| `title` | `string` | `''` | Optional heading |
| `description` | `string` | `''` | Body copy |
| `loading` | `boolean` | `false` | Skeleton placeholders |
| `dismissible` | `boolean` | `false` | Close button that hides the notice |
| `icon` | `Component` | type default | Override the leading icon |
| `dismissAriaLabel` | `string` | `'Dismiss'` | Accessible name for the close button |

## Slots

| Slot | Purpose |
| --- | --- |
| `#description` | Rich body instead of (or with) `description` |

## Events

| Event | When |
| --- | --- |
| `dismiss` | Close button is pressed |

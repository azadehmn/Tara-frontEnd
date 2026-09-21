# TrPageHeading

Page title row: title, optional description, status, back, and actions. Sticky by default; after a short scroll it compacts (hides the description and adds a shadow).

```vue
<script setup lang="ts">
import { TrButton, TrPageHeading } from '@tara/ui';
</script>

<template>
  <TrPageHeading
    title="تیکت‌ها"
    description="درخواست‌های پشتیبانی را ثبت و پیگیری کنید."
  >
    <template #action>
      <TrButton text="ثبت تیکت" />
    </template>
  </TrPageHeading>
</template>
```

With back:

```vue
<TrPageHeading
  title="جزئیات قرارداد"
  has-back
  :back-aria-label="t('common.back')"
  :status="{ type: 'positive', text: 'فعال' }"
  @back="goBack"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Heading text |
| `description` | `string` | `''` | Subtitle; hidden while compact |
| `status` | `{ type, text }` | — | `TrStatus` next to the title |
| `loading` | `boolean` | `false` | Title / description skeletons |
| `sticky` | `boolean` | `true` | Stick to the nearest scroll parent |
| `hasBack` | `boolean` | `false` | Default back button |
| `backAriaLabel` | `string` | `'Back'` | Accessible name for the default back button |

## Events

| Event | Description |
| --- | --- |
| `back` | Default back button |

## Slots

| Slot | Purpose |
| --- | --- |
| `#back` | Replace the default back button |
| `#heading` | Extra content after the title |
| `#content` | Extra content in the title row (after status) |
| `#action` | End-aligned actions |

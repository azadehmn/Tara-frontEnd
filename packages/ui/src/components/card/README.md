# TrCard

Box for a block of content (list, form, details, …).

```vue
<TrCard>
  Card content
</TrCard>
```

## Header / footer

Only render if you pass the slot.

```vue
<TrCard>
  <template #header>
    <h2>Contract details</h2>
  </template>

  Contract information goes here.

  <template #footer>
    <button type="button">Save</button>
  </template>
</TrCard>
```

## Padding

Default is `2xl`.

```vue
<TrCard padding="lg">
  Card content
</TrCard>
```

Values: `none` | `sm` | `md` | `lg` | `2xl`

## Slots

- default — body
- `main` — same as default, if you want a named slot
- `header` / `footer` — optional

# TrTooltip

Responsive tooltip for short supporting text.

```vue
<TrTooltip content="Full text">
  <span>Truncated text</span>
</TrTooltip>
```

`trigger="auto"` uses hover/focus on devices with a mouse and tap on touch devices.
The tooltip flips when there is not enough space, stays inside the viewport, closes
on outside press, Escape, scroll, or resize, and renders through `Teleport`.

Use `only-when-truncated` to open only when the trigger overflows:

```vue
<TrTooltip
  content="A long value"
  only-when-truncated
  stop-trigger-click
>
  A long value
</TrTooltip>
```

Content can also be provided with the `#content` slot. Public methods `show()` and
`hide()` are exposed for exceptional controlled interactions.

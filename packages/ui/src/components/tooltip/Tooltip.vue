<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import type { TrTooltipPlacement, TrTooltipProps } from './Tooltip';

defineOptions({
  name: 'TrTooltip',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TrTooltipProps>(), {
  content: '',
  placement: 'top',
  trigger: 'auto',
  size: 'medium',
  arrow: true,
  disabled: false,
  onlyWhenTruncated: false,
  stopTriggerClick: false,
  maxWidth: '20rem',
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const open = ref(false);
const top = ref(0);
const left = ref(0);
const resolvedPlacement = ref<TrTooltipPlacement>(props.position ?? props.placement);
const tooltipId = `tr-tooltip-${useId().replaceAll(':', '')}`;
let leaveTimer = 0;

const tooltipStyle = computed(() => ({
  top: `${top.value}px`,
  left: `${left.value}px`,
  maxWidth: props.maxWidth,
}));

function hasFinePointer(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function usesHover(): boolean {
  return props.trigger === 'hover' || (props.trigger === 'auto' && hasFinePointer());
}

function usesClick(): boolean {
  return props.trigger === 'click' || (props.trigger === 'auto' && !hasFinePointer());
}

function triggerIsTruncated(): boolean {
  if (!props.onlyWhenTruncated) return true;
  const trigger = triggerRef.value;
  if (!trigger) return false;
  return trigger.scrollWidth - trigger.clientWidth > 1
    || trigger.scrollHeight - trigger.clientHeight > 1;
}

function coordinates(
  placement: TrTooltipPlacement,
  trigger: DOMRect,
  tooltip: DOMRect,
  gap: number,
): { top: number; left: number } {
  if (placement === 'bottom') {
    return {
      top: trigger.bottom + gap,
      left: trigger.left + (trigger.width - tooltip.width) / 2,
    };
  }
  if (placement === 'left') {
    return {
      top: trigger.top + (trigger.height - tooltip.height) / 2,
      left: trigger.left - tooltip.width - gap,
    };
  }
  if (placement === 'right') {
    return {
      top: trigger.top + (trigger.height - tooltip.height) / 2,
      left: trigger.right + gap,
    };
  }
  return {
    top: trigger.top - tooltip.height - gap,
    left: trigger.left + (trigger.width - tooltip.width) / 2,
  };
}

function opposite(placement: TrTooltipPlacement): TrTooltipPlacement {
  const values: Record<TrTooltipPlacement, TrTooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  return values[placement];
}

function fits(
  placement: TrTooltipPlacement,
  position: { top: number; left: number },
  tooltip: DOMRect,
  margin: number,
): boolean {
  if (placement === 'top') return position.top >= margin;
  if (placement === 'bottom') return position.top + tooltip.height <= window.innerHeight - margin;
  if (placement === 'left') return position.left >= margin;
  return position.left + tooltip.width <= window.innerWidth - margin;
}

function place(): void {
  const trigger = triggerRef.value;
  const tooltip = tooltipRef.value;
  if (!trigger || !tooltip) return;

  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const margin = 8;
  const gap = 8;
  let placement = props.position ?? props.placement;
  let position = coordinates(placement, triggerRect, tooltipRect, gap);

  if (!fits(placement, position, tooltipRect, margin)) {
    placement = opposite(placement);
    position = coordinates(placement, triggerRect, tooltipRect, gap);
  }

  resolvedPlacement.value = placement;
  left.value = Math.min(
    Math.max(position.left, margin),
    Math.max(margin, window.innerWidth - tooltipRect.width - margin),
  );
  top.value = Math.min(
    Math.max(position.top, margin),
    Math.max(margin, window.innerHeight - tooltipRect.height - margin),
  );
}

async function show(): Promise<void> {
  window.clearTimeout(leaveTimer);
  if (props.disabled || open.value || !triggerIsTruncated()) return;

  open.value = true;
  emit('show');
  await nextTick();
  place();
}

function hide(): void {
  window.clearTimeout(leaveTimer);
  if (!open.value) return;
  open.value = false;
  emit('hide');
}

function scheduleHide(): void {
  window.clearTimeout(leaveTimer);
  leaveTimer = window.setTimeout(hide, 120);
}

function onMouseEnter(): void {
  if (usesHover()) void show();
}

function onMouseLeave(): void {
  if (usesHover()) scheduleHide();
}

function onFocusIn(): void {
  if (props.trigger !== 'click') void show();
}

function onFocusOut(event: FocusEvent): void {
  const next = event.relatedTarget;
  if (next instanceof Node && tooltipRef.value?.contains(next)) return;
  hide();
}

function onTriggerClick(event: MouseEvent): void {
  if (!usesClick() || props.disabled || !triggerIsTruncated()) return;
  if (props.stopTriggerClick) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (open.value) hide();
  else void show();
}

function onDocumentPointerDown(event: PointerEvent): void {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (triggerRef.value?.contains(target) || tooltipRef.value?.contains(target)) return;
  hide();
}

function onEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') hide();
}

function bindGlobalListeners(): void {
  document.addEventListener('pointerdown', onDocumentPointerDown);
  document.addEventListener('keydown', onEscape);
  window.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
}

function unbindGlobalListeners(): void {
  document.removeEventListener('pointerdown', onDocumentPointerDown);
  document.removeEventListener('keydown', onEscape);
  window.removeEventListener('scroll', hide, true);
  window.removeEventListener('resize', hide);
}

watch(open, (isOpen) => {
  if (isOpen) bindGlobalListeners();
  else unbindGlobalListeners();
});

watch(
  () => [props.content, props.disabled, props.placement, props.position],
  () => hide(),
);

onBeforeUnmount(() => {
  window.clearTimeout(leaveTimer);
  unbindGlobalListeners();
});

defineExpose({ show, hide });
</script>

<template>
  <span
    ref="triggerRef"
    v-bind="$attrs"
    class="tr-tooltip__trigger"
    :aria-describedby="open ? tooltipId : undefined"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @click="onTriggerClick"
  >
    <slot />
  </span>

  <Teleport to="body">
    <Transition name="tr-tooltip">
      <div
        v-if="open"
        :id="tooltipId"
        ref="tooltipRef"
        class="tr-tooltip"
        :class="[
          `tr-tooltip--${size}`,
          `tr-tooltip--${resolvedPlacement}`,
        ]"
        :style="tooltipStyle"
        role="tooltip"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <slot name="content">{{ content }}</slot>
        <span v-if="arrow" class="tr-tooltip__arrow" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>

<style src="./styles.css"></style>

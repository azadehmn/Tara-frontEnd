<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import { TrButton } from '../button';
import { TrIcon } from '../icon';
import { TrStatus } from '../status';
import { TR_PAGE_BACK } from './pageBack';
import {
  getScrollParent,
  scrollTopOf,
  type TrPageHeadingProps,
} from './PageHeading';

defineOptions({ name: 'TrPageHeading' });

const COMPACT_AT = 8;
const EXPAND_AT = 1;

const props = withDefaults(defineProps<TrPageHeadingProps>(), {
  title: '',
  description: '',
  loading: false,
  sticky: true,
  hasBack: false,
  backAriaLabel: 'Back',
});

const emit = defineEmits<{
  back: [];
}>();

const slots = useSlots();
const instance = getCurrentInstance();
const injectedBack = inject(TR_PAGE_BACK, undefined);
const rootRef = ref<HTMLElement | null>(null);
const compact = ref(false);

const showBack = computed(() => props.hasBack || Boolean(slots.back));

function handleBack() {
  if (typeof instance?.vnode.props?.onBack === 'function') {
    emit('back');
    return;
  }
  injectedBack?.();
}

let scrollTarget: HTMLElement | Window | null = null;

function onScroll() {
  if (!scrollTarget) return;
  const top = scrollTopOf(scrollTarget);
  if (compact.value) {
    if (top <= EXPAND_AT) compact.value = false;
    return;
  }
  compact.value = top >= COMPACT_AT;
}

function unbind() {
  scrollTarget?.removeEventListener('scroll', onScroll);
  scrollTarget = null;
}

function bind() {
  unbind();
  compact.value = false;
  if (!props.sticky || !rootRef.value) return;
  scrollTarget = getScrollParent(rootRef.value);
  scrollTarget.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

onMounted(bind);
onBeforeUnmount(unbind);
watch(() => props.sticky, bind);
</script>

<template>
  <header
    ref="rootRef"
    class="tr-page-heading"
    :class="{
      'is-sticky': sticky,
      'is-compact': sticky && compact,
      'has-back': showBack,
    }"
  >
    <div class="tr-page-heading__bar">
      <div class="tr-page-heading__row">
        <div v-if="showBack" class="tr-page-heading__back">
          <slot name="back">
            <TrButton variant="outlined" :ariaLabel="backAriaLabel" @click="handleBack">
              <template #icon>
                <TrIcon size="md">
                  <svg
                    class="tr-page-heading__chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </TrIcon>
              </template>
            </TrButton>
          </slot>
        </div>

        <div class="tr-page-heading__main">
          <div class="tr-page-heading__title-row">
            <span
              v-if="loading"
              class="tr-page-heading__skeleton tr-page-heading__skeleton--title"
              aria-hidden="true"
            />
            <h1 v-else-if="title" class="tr-page-heading__title">{{ title }}</h1>
            <slot v-if="!loading" name="heading" />
            <TrStatus
              v-if="status && !loading"
              :type="status.type"
              :text="status.text"
            />
            <slot v-if="!loading" name="content" />
          </div>

          <p
            v-if="!compact && !loading && description"
            class="tr-page-heading__description"
          >
            {{ description }}
          </p>
          <span
            v-else-if="!compact && loading && description"
            class="tr-page-heading__skeleton tr-page-heading__skeleton--description"
            aria-hidden="true"
          />
        </div>

        <div v-if="slots.action" class="tr-page-heading__action">
          <slot name="action" />
        </div>
      </div>
    </div>
  </header>
</template>

<style src="./styles.css"></style>

<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import { TrIcon } from '../icon';
import { TrStatus } from '../status';
import ArrowRightIcon from '../../icons/ArrowRightIcon.vue';
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

let scrollTargets: Array<HTMLElement | Window> = [];

function onScroll() {
  const top = Math.max(0, ...scrollTargets.map(scrollTopOf));
  if (compact.value) {
    if (top <= EXPAND_AT) compact.value = false;
    return;
  }
  compact.value = top >= COMPACT_AT;
}

function unbind() {
  for (const target of scrollTargets) {
    target.removeEventListener('scroll', onScroll);
  }
  scrollTargets = [];
}

function bind() {
  unbind();
  compact.value = false;
  if (!props.sticky || !rootRef.value) return;
  const parent = getScrollParent(rootRef.value);
  scrollTargets = parent === window ? [window] : [parent, window];
  for (const target of scrollTargets) {
    target.addEventListener('scroll', onScroll, { passive: true });
  }
  onScroll();
}

onMounted(bind);
onBeforeUnmount(unbind);
watch(() => props.sticky, bind);
watch(rootRef, bind);
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
            <a
              class="tr-page-heading__back-link"
              href="#"
              :aria-label="backAriaLabel"
              @click.prevent="handleBack"
            >
              <TrIcon size="md" class="tr-page-heading__chevron">
                <ArrowRightIcon />
              </TrIcon>
            </a>
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
            <div v-if="slots.action" class="tr-page-heading__action">
              <slot name="action" />
            </div>
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
      </div>
    </div>
  </header>
</template>

<style src="./styles.css"></style>

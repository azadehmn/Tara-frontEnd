<script setup lang="ts">
import { TrIcon } from '../icon';
import AngleLeftIcon from '../../icons/AngleLeftIcon.vue';
import type { TrNavLinkProps } from './NavLink';

defineOptions({ name: 'TrNavLink' });

withDefaults(defineProps<TrNavLinkProps>(), {
  label: '',
  subText: '',
  arrow: true,
  active: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="tr-nav-link"
    :class="{ 'is-active': active, 'is-loading': loading }"
    @click="emit('click', $event)"
  >
    <TrIcon v-if="arrow && !loading" size="md" class="tr-nav-link__chevron">
      <AngleLeftIcon />
    </TrIcon>
    <span class="tr-nav-link__copy">
      <span v-if="loading" class="tr-nav-link__skeleton" />
      <span v-else-if="label" class="tr-nav-link__label">{{ label }}</span>
      <span v-if="subText && !loading" class="tr-nav-link__subtext">{{ subText }}</span>
    </span>
    <span v-if="count != null && !loading" class="tr-nav-link__count">({{ count }})</span>
  </a>

  <button
    v-else
    type="button"
    class="tr-nav-link"
    :class="{ 'is-active': active, 'is-loading': loading }"
    @click="emit('click', $event)"
  >
    <TrIcon v-if="arrow && !loading" size="md" class="tr-nav-link__chevron">
      <AngleLeftIcon />
    </TrIcon>
    <span class="tr-nav-link__copy">
      <span v-if="loading" class="tr-nav-link__skeleton" />
      <span v-else-if="label" class="tr-nav-link__label">{{ label }}</span>
      <span v-if="subText && !loading" class="tr-nav-link__subtext">{{ subText }}</span>
    </span>
    <span v-if="count != null && !loading" class="tr-nav-link__count">({{ count }})</span>
  </button>
</template>

<style src="./styles.css"></style>

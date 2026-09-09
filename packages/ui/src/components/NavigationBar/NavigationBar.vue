<script setup lang="ts">
import { useSlots } from 'vue';
import { TrButton } from '../button';
import type { TrNavigationBarProps } from './NavigationBar';

defineOptions({ name: 'Tr-NavigationBar' });

withDefaults(defineProps<TrNavigationBarProps>(), {
  open: false,
});

const emit = defineEmits<{ close: [] }>();
const slots = useSlots();
</script>

<template>
  <div :class="mode === 'overlay' ? 'tr-nav-bar-overlay' : 'tr-nav-bar-host'">
    <div
      v-if="mode === 'overlay'"
      class="tr-nav-bar__backdrop"
      :class="{ 'is-open': open }"
      @click="emit('close')"
    />
    <aside
      class="tr-nav-bar"
      :class="{
        'is-overlay': mode === 'overlay',
        'is-open': mode === 'overlay' && open,
        'is-collapsed': mode === 'collapsed',
      }"
      :aria-label="ariaLabel"
      :aria-hidden="mode === 'overlay' && !open ? true : undefined"
    >
      <div v-if="mode === 'overlay' || slots.header" class="tr-nav-bar__header">
        <div v-if="slots.header" class="tr-nav-bar__header-start">
          <slot name="header" />
        </div>
        <TrButton
          v-if="mode === 'overlay'"
          variant="outlined"
          size="small"
          :aria-label="closeLabel"
          @click="emit('close')"
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </template>
        </TrButton>
      </div>
      <div v-if="slots.default" class="tr-nav-bar__main">
        <slot />
      </div>
      <div v-if="slots.footer" class="tr-nav-bar__footer">
        <slot name="footer" />
      </div>
    </aside>
  </div>
</template>

<style lang="scss" src="./NavigationBar.scss"></style>

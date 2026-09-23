<template>
  <button
    type="button"
    class="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-0 text-text hover:bg-surface-hover dark:text-text-dark dark:hover:bg-surface-dark-hover"
    :aria-label="isDark ? t('layout.themeToggle.toLight') : t('layout.themeToggle.toDark')"
    @click="toggleTheme"
  >
    <span class="inline-flex size-5" aria-hidden="true">
      <SunIcon v-if="isDark" class="size-full" />
      <MoonIcon v-else class="size-full" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SunIcon from '@tara/ui/icons/SunIcon.vue';
import MoonIcon from '@tara/ui/icons/MoonIcon.vue';
import { useThemeStore } from '../store/theme.store';

const { t } = useI18n();
const themeStore = useThemeStore();

const isDark = computed(() => themeStore.resolved === 'dark');

function toggleTheme() {
  themeStore.setMode(isDark.value ? 'light' : 'dark');
}
</script>

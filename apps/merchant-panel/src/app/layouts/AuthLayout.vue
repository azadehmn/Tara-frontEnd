<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { TrButton } from '@tara/ui';

const { t } = useI18n();
// const year = new Date().getFullYear();
const isDark = ref(document.documentElement.dataset.theme === 'dark');

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
}
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col bg-white text-text dark:bg-background-dark dark:text-text-dark"
  >
    <div class="absolute end-xl top-xl z-10">
      <TrButton
        variant="outlined"
        size="small"
        :aria-label="t('auth.themeToggle')"
        :text="isDark ? 'light' : 'dark'"
        @click="toggleTheme"
      />
    </div>

    <div class="flex flex-1 items-center justify-center p-0 min-[992px]:p-xl">
      <RouterView />
    </div>

    <p
      class="pointer-events-none absolute inset-x-0 bottom-xl text-center text-caption-regular text-text-soft dark:text-text-dark-soft"
    >
      <!-- {{ t('auth.copyright', { year }) }} -->
    </p>
  </div>
</template>

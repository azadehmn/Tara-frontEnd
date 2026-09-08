<script setup lang="ts">
import { RouterLink } from 'vue-router';

const { t } = useI18n();
</script>

<template>
  <aside
    class="flex w-64 shrink-0 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="flex h-14 items-center border-b border-slate-200 px-4 dark:border-slate-800">
      <span class="truncate text-sm font-semibold">{{ t('app.name') }}</span>
    </div>

    <nav class="flex flex-col gap-1 p-3" :aria-label="t('layout.nav.label')">
      <RouterLink
        to="/"
        class="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        exact-active-class="bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark"
      >
        {{ t('layout.nav.home') }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { SupportedLocale } from '@tara/locale';

const { t, locale } = useI18n();

function setLocale(next: SupportedLocale) {
  locale.value = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
}
</script>

<template>
  <main class="mx-auto max-w-lg p-8">
    <p class="mb-2 text-sm text-slate-500">locale smoke test</p>
    <h1 class="mb-6 text-2xl font-semibold">{{ t('app.name') }}</h1>

    <div class="mb-6 flex gap-2">
      <button
        type="button"
        class="rounded border px-3 py-1"
        @click="setLocale('fa')"
      >
        fa
      </button>
      <button
        type="button"
        class="rounded border px-3 py-1"
        @click="setLocale('en')"
      >
        en
      </button>
    </div>

    <ul class="space-y-2">
      <li>{{ t('common.save') }}</li>
      <li>{{ t('common.cancel') }}</li>
      <li>{{ t('errors.network') }}</li>
    </ul>
  </main>
</template>

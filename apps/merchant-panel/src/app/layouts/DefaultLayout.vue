<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import type { SupportedLocale } from '@tara/locale';
import AppSidebar from './AppSidebar.vue';
import taraLogo from '@assets/images/logo.svg';

const { locale } = useI18n();
const isDark = ref(document.documentElement.dataset.theme === 'dark');

function setLocale(next: SupportedLocale) {
  locale.value = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
}

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <Tr-TopBar>
        <template #start>
          <img :src="taraLogo" alt="Tara" width="61" height="25" />
        </template>
        <template #end>
          <Tr-Button variant="primary" size="small" text="fa" @click="setLocale('fa')" />
          <Tr-Button variant="secondary" size="small" text="en" @click="setLocale('en')" />
          <Tr-Button
            variant="outlined"
            size="small"
            :text="isDark ? 'light' : 'dark'"
            @click="toggleTheme"
          />
        </template>
      </Tr-TopBar>
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

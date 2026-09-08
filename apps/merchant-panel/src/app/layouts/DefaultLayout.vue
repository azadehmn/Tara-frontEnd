<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import type { SupportedLocale } from '@tara/locale';
import AppSidebar from './AppSidebar.vue';
import taraLogo from '@assets/images/logo.svg';

const { locale, t } = useI18n();
const isDark = ref(document.documentElement.dataset.theme === 'dark');
const isSidebarOpen = ref(true);

function setLocale(next: SupportedLocale) {
  locale.value = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
}

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <Tr-TopBar>
      <template #start>
        <Tr-Button
          variant="outlined"
          size="small"
          :aria-label="t('layout.sidebarToggle')"
          @click="toggleSidebar"
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M2 8h12M2 12h12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </template>
        </Tr-Button>
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

    <div class="flex min-h-0 flex-1">
      <AppSidebar v-show="isSidebarOpen" />
      <main class="min-w-0 flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

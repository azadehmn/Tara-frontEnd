<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-background text-text dark:bg-background-dark dark:text-text-dark">
    <TrTopBar>
      <template #start>
        <RouterLink to="/dashboard" class="inline-flex">
          <img :src="taraLogo" alt="Tara" width="61" height="25" class="h-[40px]" />
        </RouterLink>
      </template>
      <template #end>
        <TrButton variant="primary" size="small" text="fa" @click="setLocale('fa')" />
        <TrButton variant="secondary" size="small" text="en" @click="setLocale('en')" />
        <TrButton
          variant="outlined"
          size="small"
          :text="isDark ? 'light' : 'dark'"
          @click="toggleTheme"
        />
      </template>
    </TrTopBar>

    <main class="min-h-0 min-w-0 flex-1 overflow-y-auto py-xl">
      <div class="container-lg">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SupportedLocale } from '@tara/locale';
import { TrButton, TrTopBar } from '@tara/ui';
import taraLogo from '@assets/images/logo-persion.svg';
import { APP_LOADING_SPLASH_MS, useAppLoading } from '@shared/lib';

const { locale } = useI18n();
const { isLoading, show: showAppLoading } = useAppLoading();
const isDark = ref(document.documentElement.dataset.theme === 'dark');

onMounted(() => {
  if (!isLoading.value) return;
  showAppLoading(APP_LOADING_SPLASH_MS);
});

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

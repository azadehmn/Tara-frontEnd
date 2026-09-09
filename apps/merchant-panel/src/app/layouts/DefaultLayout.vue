<template>
  <div
    class="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
  >
    <TrTopBar>
      <template #start>
        <TrButton
          variant="outlined"
          size="small"
          :aria-label="t('layout.sidebarToggle')"
          :aria-expanded="
            viewportMode === 'overlay' ? isOverlayOpen : isRailExpanded
          "
          @click="toggleNavigation"
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
        </TrButton>
        <img :src="taraLogo" alt="Tara" width="61" height="25" />
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

    <div class="relative flex min-h-0 flex-1">
      <TrNavigationBar
        :mode="barMode"
        :open="isOverlayOpen"
        :aria-label="t('layout.nav.label')"
        :close-label="t('layout.sidebarClose')"
        @close="isOverlayOpen = false"
      >
        <AppSidebar />
      </TrNavigationBar>

      <main class="min-w-0 flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import type { SupportedLocale } from '@tara/locale';
import { TrButton, TrNavigationBar, TrTopBar, useNavigationMode } from '@tara/ui';
import type { TrNavigationMode } from '@tara/ui';
import AppSidebar from './AppSidebar.vue';
import taraLogo from '@assets/images/logo.svg';

const { locale, t } = useI18n();
const route = useRoute();
const { mode: viewportMode } = useNavigationMode();

const isDark = ref(document.documentElement.dataset.theme === 'dark');
const isOverlayOpen = ref(false);
const isRailExpanded = ref(viewportMode.value === 'expanded');

const barMode = computed<TrNavigationMode>(() => {
  if (viewportMode.value === 'overlay') return 'overlay';
  return isRailExpanded.value ? 'expanded' : 'collapsed';
});

watch(viewportMode, (next) => {
  isOverlayOpen.value = false;
  isRailExpanded.value = next === 'expanded';
});

watch(
  () => route.fullPath,
  (to, from) => {
    if (from && to !== from) isOverlayOpen.value = false;
  },
);

function setLocale(next: SupportedLocale) {
  locale.value = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
}

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
}

function toggleNavigation() {
  if (viewportMode.value === 'overlay') {
    isOverlayOpen.value = !isOverlayOpen.value;
    return;
  }
  isRailExpanded.value = !isRailExpanded.value;
}
</script>

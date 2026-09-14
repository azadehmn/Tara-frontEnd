<template>
  <div class="flex min-h-screen flex-col text-text dark:text-text-dark">
    <TrTopBar>
      <template #start>
        <TrButton
          variant="outlined"
          size="small"
          :aria-label="t('layout.sidebarToggle')"
          :aria-expanded="isOverlayOpen || isRailExpanded"
          @click="toggleNavigation"
        >
          <template #icon>
            <TrIcon size="lg" class="text-primary">
              <TrMenuIcon />
            </TrIcon>
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
      <TrNavigationBar v-if="showRail" :mode="railMode" :aria-label="t('layout.nav.label')">
        <AppSidebar />
      </TrNavigationBar>

      <TrNavigationBar
        mode="overlay"
        :open="isOverlayOpen"
        :aria-label="t('layout.nav.label')"
        :close-label="t('layout.sidebarClose')"
        @close="isOverlayOpen = false"
      >
        <AppSidebar />
      </TrNavigationBar>

      <main class="min-w-0 flex-1 overflow-auto py-xl">
        <div class="container-xl">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { SupportedLocale } from '@tara/locale';
import { TrButton, TrIcon, TrNavigationBar, TrTopBar, useNavigationMode } from '@tara/ui';
import TrMenuIcon from '@tara/ui/icons/MenuIcon.vue';
import AppSidebar from './AppSidebar.vue';
import taraLogo from '@assets/images/logo.svg';

const { locale, t } = useI18n();
const route = useRoute();
const { mode: viewportMode } = useNavigationMode();

const isDark = ref(document.documentElement.dataset.theme === 'dark');
const isOverlayOpen = ref(false);
const isRailExpanded = ref(viewportMode.value === 'expanded');

const showRail = computed(() => viewportMode.value !== 'overlay');
const railMode = computed(() => (isRailExpanded.value ? 'expanded' : 'collapsed'));

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
  if (viewportMode.value === 'expanded') {
    isRailExpanded.value = !isRailExpanded.value;
    return;
  }
  isOverlayOpen.value = !isOverlayOpen.value;
}
</script>

<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-background text-text dark:bg-background-dark dark:text-text-dark">
    <TrTopBar>
      <template #start>
        <div
          class="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-text hover:bg-surface-hover dark:text-text-dark dark:hover:bg-surface-dark-hover"
          role="button"
          tabindex="0"
          :aria-label="t('layout.sidebarToggle')"
          :aria-expanded="isOverlayOpen || isRailExpanded"
          @click="toggleNavigation"
          @keydown.enter.prevent="toggleNavigation"
          @keydown.space.prevent="toggleNavigation"
        >
          <TrIcon >
            <TrMenuIcon />
          </TrIcon>
        </div>
        <img :src="taraLogo" alt="Tara" width="61" height="25" class="h-[40px]" />
      </template>
      <template #end>
        <ThemeToggle />
        <UserMenu />
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

      <main class="min-h-0 min-w-0 flex-1 overflow-y-auto py-xl">
        <div class="container-xl">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TrIcon, TrNavigationBar, TrTopBar, useNavigationMode } from '@tara/ui';
import TrMenuIcon from '@tara/ui/icons/MenuIcon.vue';
import UserMenu from '@features/auth/ui/UserMenu.vue';
import { ThemeToggle } from '@features/settings';
import { usePanelTour } from '@features/onboarding';
import AppSidebar from './AppSidebar.vue';
import taraLogo from '@assets/images/logo-persion.svg';
import { APP_LOADING_SPLASH_MS, useAppLoading } from '@shared/lib';
// import type { SupportedLocale } from '@tara/locale';

// const { locale, t } = useI18n();
const { t } = useI18n();

const route = useRoute();
const { mode: viewportMode } = useNavigationMode();
const { isLoading, show: showAppLoading } = useAppLoading();
onMounted(() => {
  if (!isLoading.value) return;
  showAppLoading(APP_LOADING_SPLASH_MS);
});

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

function toggleNavigation() {
  if (viewportMode.value === 'expanded') {
    isRailExpanded.value = !isRailExpanded.value;
    return;
  }
  isOverlayOpen.value = !isOverlayOpen.value;
}

usePanelTour({
  prepare() {
    if (viewportMode.value === 'overlay') isOverlayOpen.value = true;
    if (viewportMode.value === 'collapsed') isRailExpanded.value = true;
  },
});
</script>

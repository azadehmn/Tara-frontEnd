<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-background text-text dark:bg-background-dark dark:text-text-dark">
    <TrTopBar>
      <template #start>
        <RouterLink to="/dashboard" class="inline-flex">
          <img :src="taraLogo" alt="Tara" width="61" height="25" class="h-[40px]" />
        </RouterLink>
      </template>
      <template #end>
        <!--
        <TrButton variant="primary" size="small" text="fa" @click="setLocale('fa')" />
        <TrButton variant="secondary" size="small" text="en" @click="setLocale('en')" />
        <TrButton
          variant="outlined"
          size="small"
          :text="isDark ? 'light' : 'dark'"
          @click="toggleTheme"
        />
        -->
        <UserMenu />
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
import { onMounted } from 'vue';
import { TrTopBar } from '@tara/ui';
import UserMenu from '@features/auth/ui/UserMenu.vue';
import taraLogo from '@assets/images/logo-persion.svg';
import { APP_LOADING_SPLASH_MS, useAppLoading } from '@shared/lib';

const { isLoading, show: showAppLoading } = useAppLoading();

onMounted(() => {
  if (!isLoading.value) return;
  showAppLoading(APP_LOADING_SPLASH_MS);
});
</script>

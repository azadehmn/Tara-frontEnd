<template>
  <div
    class="relative flex min-h-screen flex-col bg-white text-text dark:bg-background-dark dark:text-text-dark"
  >    <div class="flex flex-1 items-center justify-center p-0 min-[992px]:py-xl">

    <!-- <div class="auth-layout__scrim" aria-hidden="true" />
    <div class="relative z-[1] flex flex-1 items-center justify-center p-0 min-[992px]:py-xl"> -->
      <RouterView />
    </div>

    <p
      class="pointer-events-none absolute inset-x-0 bottom-xl text-center text-caption-regular text-text-soft dark:text-text-dark-soft"
    >
      <!-- {{ t('auth.copyright', { year }) }} -->
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { APP_LOADING_SPLASH_MS, useAppLoading } from '@shared/lib';

const { show: showAppLoading } = useAppLoading();

onMounted(() => {
  showAppLoading(APP_LOADING_SPLASH_MS);
});
</script>



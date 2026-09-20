<template>
  <Teleport to="body">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background dark:bg-background-dark"
      role="status"
      aria-live="polite"
      :aria-label="t('app.loading')"
    >
      <div class="flex flex-col items-center gap-10">
        <img :src="wordmark" :alt="t('auth.login.logoAlt')" class="h-auto w-40" />
        <div class="h-1.5 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div class="app-loading-overlay__bar" />
        </div>
      </div>

      <div
        class="absolute bottom-10 left-1/2 flex h-6 w-24 -translate-x-1/2 items-center justify-center"
      >
        <img :src="mark" :alt="t('auth.login.logoAlt')" class="h-6 w-auto" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import mark from '@assets/images/logo.svg';
import wordmark from '@assets/images/logo-persion.svg';
import { useAppLoading } from '@shared/lib';

const { t } = useI18n();
const { isLoading } = useAppLoading();
</script>

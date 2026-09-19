<script setup lang="ts">
import { computed, ref } from 'vue';
import { TrButton, TrTextField } from '@tara/ui';
import { ImageSlider } from '@shared/ui';
import taraLogo from '@assets/images/logo-persion.svg';
import { serviceBanners } from '../config/service-banners';

const { t } = useI18n();

const username = ref('');
const password = ref('');
const isPasswordVisible = ref(false);

const slides = computed(() =>
  serviceBanners.map((slide, index) => ({
    ...slide,
    alt: t('auth.login.bannerAlt', { n: index + 1 }),
  })),
);

const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
</script>

<template>
  <div
    class="flex h-auto w-[90%] max-w-[90%] flex-col overflow-hidden rounded-2xl border border-transparent bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.10)] min-[567px]:w-[450px] min-[567px]:max-w-[450px] min-[992px]:min-h-[560px] min-[992px]:max-h-[88vh] min-[992px]:w-full min-[992px]:max-w-[900px] min-[992px]:flex-row-reverse xl:max-w-[90%] dark:border-gray-800 dark:bg-surface-dark dark:shadow-[0_8px_48px_rgba(0,0,0,0.40)]"
  >
    <div
      class="relative hidden min-h-0 min-[992px]:block min-[992px]:flex-1"
    >
      <ImageSlider
        class="absolute inset-0"
        fit="cover"
        :slides="slides"
        :prev-label="t('common.prev')"
        :next-label="t('common.next')"
      />
      <img
        :src="taraLogo"
        alt=""
        class="pointer-events-none absolute left-4 top-4 z-20 h-7 w-auto drop-shadow-[0_2px_8px_rgba(20,4,40,0.45)]"
        draggable="false"
      />
    </div>

    <section
      class="flex w-full flex-col justify-center overflow-y-auto px-xl py-2xl min-[992px]:w-[23rem] min-[992px]:flex-none"
    >
      <img :src="taraLogo" :alt="t('auth.login.logoAlt')" class="mb-xl h-8 w-auto self-start" />

      <h1 class="text-heading-lg text-text dark:text-text-dark">
        {{ t('auth.login.title') }}
      </h1>
      <p class="mt-2xs text-body-sm text-text-soft dark:text-text-dark-soft">
        {{ t('auth.login.description') }}
      </p>

      <form class="mt-xl flex flex-col gap-lg" @submit.prevent>
        <TrTextField
          v-model="username"
          name="username"
          autocomplete="username"
          :placeholder="t('auth.login.username')"
        />
        <TrTextField
          v-model="password"
          name="password"
          :type="passwordType"
          autocomplete="current-password"
          :placeholder="t('auth.login.password')"
          :action-aria-label="
            isPasswordVisible ? t('auth.login.hidePassword') : t('auth.login.showPassword')
          "
          @action="isPasswordVisible = !isPasswordVisible"
        >
          <template #after>
            <svg v-if="isPasswordVisible" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 3l18 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M10.5 10.7A3 3 0 0 0 13.3 13.5M9.9 5.2A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.4 18.4 0 0 1-4.1 4.7M6.1 6.4A18.5 18.5 0 0 0 2 12s4 7 10 7c1.4 0 2.7-.3 3.9-.8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </template>
        </TrTextField>

        <TrButton class="w-full" html-type="submit" size="large" :text="t('auth.login.submit')" />
      </form>
    </section>
  </div>
</template>

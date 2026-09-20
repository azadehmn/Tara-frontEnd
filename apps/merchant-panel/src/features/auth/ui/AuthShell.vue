<script setup lang="ts">
import { computed } from 'vue';
import { ImageSlider } from '@shared/ui';
import taraLogo from '@assets/images/logo-persion.svg';
import { serviceBanners } from '../config/service-banners';

const { t } = useI18n();

const slides = computed(() =>
  serviceBanners.map((slide, index) => ({
    ...slide,
    alt: t('auth.login.bannerAlt', { n: index + 1 }),
  })),
);
</script>

<template>
  <div
    class="flex h-auto w-[90%] max-w-[90%] flex-col overflow-hidden rounded-2xl border border-transparent bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.10)] min-[567px]:w-[450px] min-[567px]:max-w-[450px] min-[992px]:min-h-[560px] min-[992px]:max-h-[88vh] min-[992px]:w-full min-[992px]:max-w-[900px] min-[992px]:flex-row-reverse xl:max-w-[90%] dark:border-gray-800 dark:bg-surface-dark dark:shadow-[0_8px_48px_rgba(0,0,0,0.40)]"
  >
    <div class="relative hidden min-h-0 min-[992px]:block min-[992px]:flex-1">
       <!-- :interval-ms="10000" -->
      <ImageSlider
        class="absolute inset-0"
        fit="cover"
        :autoplay="false"
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
      <slot />
    </section>
  </div>
</template>

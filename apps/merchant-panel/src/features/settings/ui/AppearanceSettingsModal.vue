<template>
  <TrModal
    class="appearance-modal"
    :open="open"
    width="34rem"
    height="400px"
    :title="t('layout.settings.title')"
    :close-aria-label="t('layout.settings.close')"
    :header-border="false"
    @close="emit('close')"
  >
    <template #header>
      <div class="flex min-w-0 flex-1 items-start gap-sm">
        <div class="min-w-0 flex-1 text-start">
          <h2 class="tr-modal__title">{{ t('layout.settings.title') }}</h2>
          <p class="mb-0 mt-2xs text-body-sm leading-6 text-[#6B7280] dark:text-text-dark-soft">
            {{ t('layout.settings.intro') }}
          </p>
        </div>
      </div>
    </template>

    <div dir="ltr" class="grid grid-cols-1 gap-sm sm:grid-cols-3">
      <button
        v-for="option in options"
        :key="option.mode"
        type="button"
        class="flex cursor-pointer flex-col items-center rounded-[14px] border border-solid bg-white px-sm pb-sm pt-sm dark:bg-surface-dark"
        :class="
          themeStore.mode === option.mode
            ? 'border-[#4C6FFF] shadow-[0_0_0_1px_#4C6FFF] dark:border-primary-dark dark:shadow-[0_0_0_1px_var(--color-primary-dark)]'
            : 'border-[#E6EAF2] dark:border-gray-800'
        "
        :aria-pressed="themeStore.mode === option.mode"
        @click="themeStore.setMode(option.mode)"
      >
        <div class="h-[68px] w-full" aria-hidden="true">
          <div v-if="option.mode === 'system'" class="flex h-full overflow-hidden rounded-[10px]">
            <div class="h-full w-1/2 overflow-hidden">
              <ThemeSketch tone="light" />
            </div>
            <div class="h-full w-1/2 overflow-hidden">
              <ThemeSketch tone="dark" />
            </div>
          </div>
          <ThemeSketch v-else class="overflow-hidden rounded-[10px]" :tone="option.mode" />
        </div>

        <span
          dir="rtl"
          class="mt-sm flex items-center justify-center gap-2xs text-body-sm text-[#1F2937] dark:text-text-dark"
        >
          <span class="text-[15px] leading-none" aria-hidden="true">{{ option.emoji }}</span>
          {{ t(option.titleKey) }}
        </span>

        <span
          class="mt-sm inline-flex size-5 items-center justify-center rounded-full border border-solid"
          :class="
            themeStore.mode === option.mode
              ? 'border-[#4C6FFF] bg-[#4C6FFF]'
              : 'border-[#C9D2E3] bg-white dark:border-gray-600 dark:bg-transparent'
          "
          aria-hidden="true"
        >
          <span v-if="themeStore.mode === option.mode" class="size-1.5 rounded-full bg-white" />
        </span>
      </button>
    </div>

    <p
      class="mb-0 mt-lg flex items-center justify-start gap-xs text-caption-regular text-[#6B7280] dark:text-text-dark-soft"
    >
      <TrIcon size="sm" class="shrink-0 text-[#6B7CFF] dark:text-[#A5B0FF]">
        <InfoFillIcon />
      </TrIcon>
      {{ t('layout.settings.note') }}
    </p>
  </TrModal>
</template>

<script setup lang="ts">
import { TrIcon, TrModal } from '@tara/ui';
import InfoFillIcon from '@tara/ui/icons/InfoFillIcon.vue';
import { useThemeStore } from '../store/theme.store';
import type { ThemeMode } from '../lib/theme';
import ThemeSketch from './ThemeSketch.vue';

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();
const themeStore = useThemeStore();

const options: { mode: ThemeMode; titleKey: string; emoji: string }[] = [
  { mode: 'light', titleKey: 'layout.settings.theme.light.title', emoji: '☀️' },
  { mode: 'system', titleKey: 'layout.settings.theme.system.title', emoji: '💻' },
  { mode: 'dark', titleKey: 'layout.settings.theme.dark.title', emoji: '🌙' },
];
</script>

<style>
.appearance-modal .tr-modal__dialog {
  border-radius: 20px;
}

.appearance-modal .tr-modal__header {
  align-items: flex-start;
  padding-bottom: 4px;
  padding-inline: 32px;
}

.appearance-modal .tr-modal__body {
  padding-top: 12px;
  padding-inline: 32px;
  padding-bottom: 32px;
}
</style>

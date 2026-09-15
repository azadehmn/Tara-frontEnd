<script setup lang="ts">
import { TrButton, TrStatus, type TrButtonSize, type TrButtonVariant, type TrStatusType } from '@tara/ui';
import TrCircleCheckIcon from '@tara/ui/icons/CircleCheckIcon.vue';
import TrCircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import TrDetailsIcon from '@tara/ui/icons/DetailsIcon.vue';

const { t } = useI18n();

const variants: TrButtonVariant[] = ['primary', 'secondary', 'outlined'];
const sizes: TrButtonSize[] = ['small', 'medium', 'large'];

const statusTypes: TrStatusType[] = [
  'neutral',
  'informative',
  'warning',
  'negative',
  'positive',
];

const statusIcons: Record<TrStatusType, typeof TrCircleCheckIcon> = {
  neutral: TrDetailsIcon,
  informative: TrDetailsIcon,
  warning: TrDetailsIcon,
  negative: TrCircleSlashIcon,
  positive: TrCircleCheckIcon,
};
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('layout.nav.demo') }}</h1>

    <p class="mb-6 text-sm opacity-70">TrButton demo</p>

    <section v-for="variant in variants" :key="variant" class="mb-10">
      <h2 class="mb-3 text-lg font-semibold">{{ variant }}</h2>

      <div v-for="size in sizes" :key="size" class="mb-4 flex flex-wrap items-center gap-2">
        <span class="w-20 text-xs opacity-60">{{ size }}</span>
        <TrButton :variant="variant" :size="size" text="دکمه" />
        <TrButton :variant="variant" :size="size" text="دکمه" selected />
        <TrButton :variant="variant" :size="size" text="دکمه" loading />
        <TrButton :variant="variant" :size="size" text="دکمه" disabled />
        <TrButton :variant="variant" :size="size" text="دکمه">
          <template #before-icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" />
            </svg>
          </template>
        </TrButton>
        <TrButton :variant="variant" :size="size" text="دکمه">
          <template #after-icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
          </template>
        </TrButton>
        <TrButton :variant="variant" :size="size" :aria-label="`${variant} ${size} icon`">
          <template #icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="5" />
            </svg>
          </template>
        </TrButton>
      </div>
    </section>

    <p class="mb-6 text-sm opacity-70">TrStatus demo</p>
    <section v-for="type in statusTypes" :key="type" class="mb-8">
      <h2 class="mb-3 text-lg font-semibold">{{ type }}</h2>
      <div class="flex flex-wrap items-center gap-3">
        <TrStatus :type="type" text="وضعیت" />
        <TrStatus :type="type" text="وضعیت" dot />
        <TrStatus :type="type" text="وضعیت" :icon="statusIcons[type]" />
        <TrStatus :type="type" text="وضعیت" :icon="statusIcons[type]" dot />
        <TrStatus :type="type" :icon="statusIcons[type]" />
        <TrStatus :type="type" dot />
      </div>
    </section>
  </div>
</template>

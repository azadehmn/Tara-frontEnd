<script setup lang="ts">
import { TrButton } from '@tara/ui';
import type { TrButtonSize, TrButtonVariant } from '@tara/ui';

const { t } = useI18n();

const variants: TrButtonVariant[] = ['primary', 'secondary', 'outlined'];
const sizes: TrButtonSize[] = ['small', 'medium', 'large'];
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('app.name') }}</h1>
    <p class="mb-6 text-sm opacity-70">TrButton demo</p>

    <section v-for="variant in variants" :key="variant" class="mb-10">
      <h2 class="mb-3 text-lg font-semibold">{{ variant }}</h2>

      <div
        v-for="size in sizes"
        :key="size"
        class="mb-4 flex flex-wrap items-center gap-2"
      >
        <span class="w-20 text-xs opacity-60">{{ size }}</span>
        <TrButton :variant="variant" :size="size" text="default" />
        <TrButton :variant="variant" :size="size" text="selected" selected />
        <TrButton :variant="variant" :size="size" :text="t('common.save')" loading />
        <TrButton :variant="variant" :size="size" text="disabled" disabled />
        <TrButton :variant="variant" :size="size" text="before">
          <template #before-icon>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" />
            </svg>
          </template>
        </TrButton>
        <TrButton :variant="variant" :size="size" text="after">
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
  </div>
</template>

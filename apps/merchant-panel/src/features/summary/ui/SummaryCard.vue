<script setup lang="ts">
import { TrCard, TrIcon, TrLabel } from '@tara/ui';
import SessionIcon from '@tara/ui/icons/Session.vue';
import type { SummaryCardProps } from './SummaryCard';

defineProps<SummaryCardProps>();

const { t } = useI18n();
</script>

<template>
  <TrCard class="h-full">
    <template #header>
      <div class="flex items-center gap-xs">
        <TrIcon size="lg">
          <SessionIcon />
        </TrIcon>
        <h2 class="text-heading-sm">{{ title }}</h2>
      </div>
    </template>

    <div
      class="flex flex-col items-center justify-center gap-xs my-2xl rounded-sm border border-border-divider p-md dark:border-gray-800"
    >
      <span class="text-body-sm text-text-soft">{{ heroLabel }}</span>
      <div class="flex items-center gap-xs">
        <span class="text-display-700-d3">{{ heroValue }}</span>
        <TrLabel :text="t('common.currency.rial')" type="neutral" />
      </div>
    </div>

    <ul class="mt-md flex flex-col gap-sm">
      <li v-for="row in rows" :key="row.label" class="flex items-baseline gap-xs text-body-sm">
        <span class="shrink-0 text-end font-medium text-text dark:text-text-dark">{{ row.label }}</span>
        <span
          class="min-w-4 flex-1 border-b border-dotted border-text-soft dark:border-text-dark-soft"
          aria-hidden="true"
        />
        <span class="inline-flex shrink-0 items-center gap-xs">
          {{ row.value }}
          <TrLabel v-if="row.currency" :text="t('common.currency.rial')" type="neutral" />
        </span>
      </li>
    </ul>
  </TrCard>
</template>

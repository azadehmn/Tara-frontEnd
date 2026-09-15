<script setup lang="ts">
import { TrCard } from '@tara/ui';
import type { SummaryCardProps } from './SummaryCard';

defineProps<SummaryCardProps>();
</script>

<template>
  <TrCard>
    <template #header>
      <h2 class="text-heading-sm">{{ title }}</h2>
    </template>

    <p class="text-sm text-text-soft">{{ heroLabel }}</p>
    <p class="mt-1 text-heading-md">{{ heroValue }}</p>

    <ul class="mt-md flex flex-col gap-sm">
      <li v-for="row in rows" :key="row.label" class="flex justify-between gap-3 text-sm">
        <span class="text-text-soft">{{ row.label }}</span>
        <span>{{ row.value }}</span>
      </li>
    </ul>
  </TrCard>
</template>

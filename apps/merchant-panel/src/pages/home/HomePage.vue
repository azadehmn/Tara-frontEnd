<script setup lang="ts">
import { TrCard } from '@tara/ui';
import { IncomeChartCard } from '@features/income';

const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('layout.nav.dashboard') }}</h1>
    <div class="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-12">
      <IncomeChartCard class="lg:col-span-9" />
      <div class="flex flex-col gap-lg lg:col-span-3">
        <TrCard />
        <TrCard />
      </div>
    </div>
  </div>
</template>

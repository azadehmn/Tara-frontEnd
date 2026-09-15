<script setup lang="ts">
import { TrCard } from '@tara/ui';
import { IncomeChartCard } from '@features/income';

const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('layout.nav.dashboard') }}</h1>
    <div class="mt-lg grid grid-cols-1 gap-lg min-[992px]:grid-cols-12">
      <IncomeChartCard class="min-[992px]:col-span-7 xl:col-span-8" />
      <div class="flex flex-col gap-lg min-[992px]:col-span-5 xl:col-span-4">
        <TrCard />
        <TrCard />
      </div>
    </div>
  </div>
</template>

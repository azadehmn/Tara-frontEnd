<script setup lang="ts">
import { onMounted } from 'vue';
import { IncomeChartCard } from '@features/income';
import { SummaryCards, useSummary } from '@features/summary';

const { t } = useI18n();
const { summary, pending, error, fetch } = useSummary();

onMounted(fetch);
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg">{{ t('layout.nav.dashboard') }}</h1>
    <div class="mt-lg grid grid-cols-1 gap-lg min-[992px]:grid-cols-12">
      <IncomeChartCard
        class="min-[992px]:col-span-7 xl:col-span-8"
        :today-successful-transactions-amount="summary?.todaySuccessfulTransactionsAmount"
        :today-successful-transactions-count="summary?.todaySuccessfulTransactionsCount"
        :current-month-successful-transactions-amount="
          summary?.currentMonthSuccessfulTransactionsAmount
        "
        :current-month-successful-transactions-count="
          summary?.currentMonthSuccessfulTransactionsCount
        "
      />
      <SummaryCards
        class="min-[992px]:col-span-5 xl:col-span-4"
        :summary="summary"
        :pending="pending"
        :error-message="error?.message ?? null"
      />
    </div>
  </div>
</template>

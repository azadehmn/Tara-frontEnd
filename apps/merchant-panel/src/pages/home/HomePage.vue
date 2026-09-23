<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IncomeChartCard, IncomeChartPeriod, SuccessfulPeriodStats } from '@features/income';
import { PerformanceCard, SummaryCards, useSummary } from '@features/summary';
import { RecentTransactionsCard } from '@features/transactions';
import { TrCard, TrPageHeading } from '@tara/ui';

const { t } = useI18n();
const { summary, pending, error, fetch } = useSummary();
const period = ref<IncomeChartPeriod>(IncomeChartPeriod.Monthly);

onMounted(fetch);
</script>

<template>
  <div>
    <TrPageHeading :title="t('layout.nav.dashboard')"/>
    <PerformanceCard v-if="summary" class="mt-lg" :summary="summary" />
    <div class="mt-lg grid grid-cols-1 gap-lg min-[992px]:grid-cols-12">
      <IncomeChartCard
        class="min-[992px]:col-span-7 xl:col-span-8"
        @update:period="period = $event"
      />
      <div class="flex flex-col gap-lg min-[992px]:col-span-5 xl:col-span-4">
        <TrCard v-if="summary">
          <SuccessfulPeriodStats :summary="summary" :period="period" />
        </TrCard>
        <SummaryCards
          :summary="summary"
          :pending="pending"
          :error-message="error?.message ?? null"
        />
      </div>
    </div>
    <RecentTransactionsCard class="mt-lg" />
  </div>
</template>

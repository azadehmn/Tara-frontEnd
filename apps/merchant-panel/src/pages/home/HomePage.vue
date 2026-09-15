<script setup lang="ts">
import { IncomeChartCard } from '@features/income';

const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="m-2xs text-heading-lg ">{{ t('layout.nav.dashboard') }}</h1>
    <IncomeChartCard class="mt-lg" />
  </div>
</template>

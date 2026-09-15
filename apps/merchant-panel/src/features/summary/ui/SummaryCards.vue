<script setup lang="ts">
import { onMounted } from 'vue';
import { TrCard } from '@tara/ui';
import { useSummary } from '../composables/use-summary';
import BalanceCard from './BalanceCard.vue';
import SalesCard from './SalesCard.vue';

const { t } = useI18n();
const { summary, pending, error, fetch } = useSummary();

onMounted(fetch);
</script>

<template>
  <div class="flex flex-col gap-lg">
    <TrCard v-if="pending && !summary">
      <p class="text-sm opacity-70">{{ t('summary.loading') }}</p>
    </TrCard>
    <TrCard v-else-if="error">
      <p class="text-sm">{{ error.message }}</p>
    </TrCard>
    <template v-else-if="summary">
      <SalesCard :summary="summary" />
      <BalanceCard :summary="summary" />
    </template>
  </div>
</template>

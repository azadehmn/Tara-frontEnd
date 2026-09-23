<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TrButton, TrCard, TrEmptyState } from '@tara/ui';

const { t } = useI18n();
const router = useRouter();

function openTransactions() {
  void router.push({ name: 'transactions' });
}
</script>

<template>
  <TrCard>
    <template #header>
      <div class="flex items-center justify-between gap-md">
        <h2 class="text-heading-md">{{ t('transactions.recent') }}</h2>
        <TrButton
          variant="outlined"
          size="small"
          :text="t('transactions.viewAll')"
          @click="openTransactions"
        />
      </div>
    </template>

    <TrEmptyState vector="Transactions" :title="t('common.empty')" />
  </TrCard>
</template>

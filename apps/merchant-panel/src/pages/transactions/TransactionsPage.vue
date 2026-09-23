<script setup lang="ts">
import { TrCard, TrPageHeading } from '@tara/ui';
import { TransactionTable } from '@features/transactions';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.transactions')" />
    <TrCard>
      <TransactionTable />
    </TrCard>
  </div>
</template>

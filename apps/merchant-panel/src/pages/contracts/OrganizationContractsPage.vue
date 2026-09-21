<script setup lang="ts">
import ContractListView from '@features/contracts/ui/ContractListView.vue';
import { TrPageHeading } from '@tara/ui';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.contractsOrganization')" />
    <ContractListView scope="organization" detail-route="contracts-organization-detail" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { TrButton, TrCard, TrTable, type TrTableColumn } from '@tara/ui';
import { useContractMerchants } from '../composables/use-contract-merchants';

const props = defineProps<{ contractId: string }>();
const { t } = useI18n();
const contractId = computed(() => props.contractId);
const { merchants, total, page, size, pending, error, fetch } = useContractMerchants(
  () => contractId.value,
);

onMounted(() => {
  void fetch(true);
});

watch(contractId, () => {
  void fetch(true);
});

function pageCount() {
  return Math.max(1, Math.ceil(total.value / size.value));
}

const columns = computed<TrTableColumn[]>(() => [
  { name: 'title', label: t('contracts.merchants.name') },
  { name: 'branchCode', label: t('contracts.merchants.branchCode') },
  { name: 'accessibleType', label: t('contracts.merchants.type') },
  { name: 'provinceName', label: t('contracts.merchants.province') },
]);
</script>

<template>
  <TrCard>
    <template #header>{{ t('contracts.merchants.title') }}</template>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error.message }}</p>
    <TrTable
      :columns="columns"
      :items="merchants"
      :loading="pending"
      :empty-text="t('common.empty')"
    >
      <template #item-provincename="{ item }">
        {{ item.provinceName ?? '—' }}
      </template>
    </TrTable>
    <template #footer>
      <div class="flex items-center gap-3">
        <TrButton
          variant="outlined"
          size="small"
          :text="t('common.prev')"
          :disabled="page <= 1"
          @click="
            page -= 1;
            fetch();
          "
        />
        <span>{{ page }} / {{ pageCount() }}</span>
        <TrButton
          variant="outlined"
          size="small"
          :text="t('common.next')"
          :disabled="page >= pageCount()"
          @click="
            page += 1;
            fetch();
          "
        />
      </div>
    </template>
  </TrCard>
</template>

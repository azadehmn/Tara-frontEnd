<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { TrAction, TrButton, TrCard, TrTable, type TrActionItem, type TrTableColumn } from '@tara/ui';
import { useContractBatches } from '../composables/use-contract-batches';
import type { ContractBatch } from '../model/batch';

const props = defineProps<{ contractId: string }>();
const { t } = useI18n();
const contractId = computed(() => props.contractId);
const {
  batches,
  total,
  page,
  size,
  pending,
  error,
  fetch,
  run,
  pause,
} = useContractBatches(() => contractId.value);

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
  { name: 'title', label: t('contracts.batches.fileTitle') },
  { name: 'batchType', label: t('contracts.batches.fileType') },
  { name: 'createdOn', label: t('contracts.batches.uploadedAt') },
  { name: 'state', label: t('contracts.batches.state') },
]);

function rowActions(item: ContractBatch): TrActionItem[] {
  return [
    {
      id: 'run',
      label: t('contracts.batches.run'),
      command: () => {
        void run(item);
      },
    },
    {
      id: 'pause',
      label: t('contracts.batches.pause'),
      command: () => {
        void pause(item);
      },
    },
  ];
}
</script>

<template>
  <TrCard>
    <template #header>{{ t('contracts.batches.title') }}</template>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error.message }}</p>
    <TrTable
      :columns="columns"
      :items="batches"
      :loading="pending"
      :empty-text="t('common.empty')"
    >
      <template #item-state="{ item }">
        {{ item.state ?? '—' }}
      </template>
      <template #action="{ item }">
        <TrAction :aria-label="t('common.actions')" :items="rowActions(item)" />
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

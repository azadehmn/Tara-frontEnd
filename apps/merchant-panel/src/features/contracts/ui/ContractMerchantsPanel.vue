<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useContractMerchants } from '../composables/use-contract-merchants';
import { TrButton } from '@tara/ui';

const props = defineProps<{ contractId: string }>();
const { t } = useI18n();
const contractId = computed(() => props.contractId);
const { items, total, page, size, loading, error, fetchList } = useContractMerchants(
  () => contractId.value,
);

onMounted(() => {
  void fetchList(true);
});

watch(contractId, () => {
  void fetchList(true);
});

function pageCount() {
  return Math.max(1, Math.ceil(total.value / size.value));
}
</script>

<template>
  <section class="flex flex-col gap-3">
    <h2 class="text-heading-sm">{{ t('contracts.merchants.title') }}</h2>
    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <p v-else-if="loading" class="text-sm opacity-70">{{ t('common.loading') }}</p>
    <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.merchants.name') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.merchants.branchCode') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.merchants.type') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.merchants.province') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!loading && items.length === 0">
            <td colspan="4" class="px-3 py-6 text-center opacity-60">{{ t('common.empty') }}</td>
          </tr>
          <tr
            v-for="row in items"
            :key="row.id"
            class="border-t border-slate-100 dark:border-slate-800"
          >
            <td class="px-3 py-2">{{ row.title }}</td>
            <td class="px-3 py-2">{{ row.branchCode }}</td>
            <td class="px-3 py-2">{{ row.accessibleType }}</td>
            <td class="px-3 py-2">{{ row.provinceName ?? '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center gap-3 text-sm">
      <TrButton
        variant="outlined"
        size="small"
        :text="t('common.prev')"
        :disabled="page <= 1"
        @click="
          page -= 1;
          fetchList();
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
          fetchList();
        "
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { TrButton } from '@tara/ui';
import { setContractOrgStatus } from '../api/contracts.api';
import { useContractList } from '../composables/use-contract-list';
import type { ContractListItem, ContractScope } from '../model/contract';

const props = defineProps<{
  scope: ContractScope;
  detailRoute: string;
}>();

const { t } = useI18n();
const router = useRouter();
const { contracts, total, page, size, pending, error, filters, fetchList } = useContractList(
  props.scope,
);

onMounted(() => {
  void fetchList(true);
});

function openDetail(row: ContractListItem) {
  void router.push({ name: props.detailRoute, params: { id: String(row.id) } });
}

async function toggleOrgStatus(row: ContractListItem) {
  await setContractOrgStatus(row.id, row.deactivatedByOrg);
  await fetchList();
}

function applyFilters() {
  void fetchList(true);
}

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / size.value)));
function goToPreviousPage() {
  if (page.value <= 1) return;

  page.value -= 1;
  void fetchList();
}

function goToNextPage() {
  if (page.value >= pageCount.value) return;

  page.value += 1;
  void fetchList();
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <form class="flex flex-wrap items-end gap-3" @submit.prevent="applyFilters">
      <label class="flex flex-col gap-1 text-sm">
        <span>{{ t('contracts.fields.id') }}</span>
        <input
          v-model="filters.id"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm">
        <span>{{ t('contracts.fields.title') }}</span>
        <input
          v-model="filters.title"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm">
        <span>{{ t('contracts.fields.profileTitle') }}</span>
        <input
          v-model="filters.profileTitle"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <TrButton variant="primary" size="small" html-type="submit" :text="t('common.search')" />
    </form>

    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <p v-else-if="pending" class="text-sm opacity-70">{{ t('common.loading') }}</p>

    <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 text-start dark:bg-slate-800">
          <tr>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.id') }}</th>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.title') }}</th>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.profileTitle') }}</th>
            <th v-if="scope === 'organization'" class="px-3 py-2 font-medium">
              {{ t('contracts.fields.type') }}
            </th>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.endDate') }}</th>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.status') }}</th>
            <th class="px-3 py-2 font-medium">{{ t('contracts.fields.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!pending && !error && contracts.length === 0">
            <td colspan="7" class="px-3 py-6 text-center opacity-60">{{ t('common.empty') }}</td>
          </tr>
          <tr
            v-for="row in contracts"
            :key="row.id"
            class="border-t border-slate-100 dark:border-slate-800"
          >
            <td class="px-3 py-2">{{ row.id }}</td>
            <td class="px-3 py-2">{{ row.title }}</td>
            <td class="px-3 py-2">{{ row.profileTitle }}</td>
            <td v-if="scope === 'organization'" class="px-3 py-2">{{ row.type }}</td>
            <td class="px-3 py-2">{{ row.endDate }}</td>
            <td class="px-3 py-2">{{
              row.isEnabled ? t('contracts.status.active') : t('contracts.status.inactive')
            }}</td>
            <td class="px-3 py-2">
              <div class="flex flex-wrap gap-2">
                <TrButton
                  variant="outlined"
                  size="small"
                  :text="t('contracts.actions.details')"
                  @click="openDetail(row)"
                />
                <TrButton
                  v-if="scope === 'organization'"
                  variant="secondary"
                  size="small"
                  :text="
                    row.deactivatedByOrg
                      ? t('contracts.actions.activate')
                      : t('contracts.actions.deactivate')
                  "
                  @click="toggleOrgStatus(row)"
                />
              </div>
            </td>
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
        @click="goToPreviousPage"
      />
      <span>{{ page }} / {{ pageCount }}</span>
      <TrButton
        variant="outlined"
        size="small"
        :text="t('common.next')"
        :disabled="page >= pageCount"
        @click="goToNextPage"
      />
    </div>
  </div>
</template>

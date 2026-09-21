<template>
  <div class="flex flex-col gap-4">
    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <form class="flex flex-wrap items-end gap-3 mb-2xl" @submit.prevent="applyFilters">
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
    <TrCard>
      <TrTable
        :columns="columns"
        :items="contracts"
        :loading="pending"
        :title="t('common.empty')"
        vector="EmptyPaper"
        show-card-header-label
        card-header-addon-column="isEnabled"
        
      >
      
        <template #item-type="{ item }">
          {{ t(`contracts.types.${item.type}`) }}
        </template>
        <template #item-isenabled="{ item }">

          <TrStatus
            :type="item.isEnabled ? 'positive' : 'negative'"
            :text="item.isEnabled ? t('contracts.status.active') : t('contracts.status.inactive')"
          />
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
      </template>
    </TrCard>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  TrAction,
  TrButton,
  TrCard,
  TrStatus,
  TrTable,
  type TrActionItem,
  type TrTableColumn,
} from '@tara/ui';
import TrCircleCheckIcon from '@tara/ui/icons/CircleCheckIcon.vue';
import TrCircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import TrDetailsIcon from '@tara/ui/icons/DetailsIcon.vue';
import { setContractOrgStatus } from '../api/contracts.api';
import { useContractList } from '../composables/use-contract-list';
import type { ContractListItem, ContractScope } from '../model/contract';

const props = defineProps<{
  scope: ContractScope;
  detailRoute: string;
}>();

const { t } = useI18n();
const router = useRouter();
const { contracts, total, page, size, pending, error, filters, fetch } = useContractList(
  props.scope,
);

onMounted(() => {
  void fetch(true);
});

function openDetail(row: ContractListItem) {
  void router.push({ name: props.detailRoute, params: { id: String(row.id) } });
}

async function toggleOrgStatus(row: ContractListItem) {
  await setContractOrgStatus(row.id, row.deactivatedByOrg);
  await fetch();
}

function applyFilters() {
  void fetch(true);
}

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / size.value)));
function goToPreviousPage() {
  if (page.value <= 1) return;

  page.value -= 1;
  void fetch();
}

function goToNextPage() {
  if (page.value >= pageCount.value) return;

  page.value += 1;
  void fetch();
}

const columns = computed<TrTableColumn[]>(() => {
  const base: TrTableColumn[] = [
    { name: 'id', label: t('contracts.fields.id'), width: 'minmax(120px, 0.6fr)' },
    { name: 'title', label: t('contracts.fields.title') },
    { name: 'profileTitle', label: t('contracts.fields.profileTitle') },
  ];

  if (props.scope === 'organization') {
    base.push({ name: 'type', label: t('contracts.fields.type'), width: 'minmax(120px, 0.7fr)' });
  }

  base.push(
    { name: 'endDate', label: t('contracts.fields.endDate'), width: 'minmax(120px, 0.7fr)' },
    { name: 'isEnabled', label: t('contracts.fields.status'), width: 'minmax(100px, 0.5fr)' },
  );

  return base;
});

function rowActions(item: ContractListItem): TrActionItem[] {
  const items: TrActionItem[] = [
    {
      id: 'details',
      label: t('contracts.actions.details'),
      icon: TrDetailsIcon,
      command: () => openDetail(item),
    },
  ];

  if (props.scope === 'organization') {
    const isInactive = Boolean(item.deactivatedByOrg) || !item.isEnabled;
    items.push({
      id: 'toggle-status',
      label: isInactive ? t('contracts.actions.activate') : t('contracts.actions.deactivate'),
      icon: isInactive ? TrCircleCheckIcon : TrCircleSlashIcon,
      tone: isInactive ? 'success' : 'danger',
      command: () => {
        void toggleOrgStatus(item);
      },
    });
  }

  return items;
}
</script>

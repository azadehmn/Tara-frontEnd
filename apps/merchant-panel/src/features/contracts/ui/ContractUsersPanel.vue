<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { TrAction, TrButton, TrCard, TrTable, type TrActionItem, type TrTableColumn } from '@tara/ui';
import TrCircleCheckIcon from '@tara/ui/icons/CircleCheckIcon.vue';
import TrCircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import { useContractUsers } from '../composables/use-contract-users';
import type { ContractUser } from '../model/user';

const props = defineProps<{ contractId: string }>();
const { t } = useI18n();
const contractId = computed(() => props.contractId);
const { users, total, page, size, pending, error, fetch, toggleOrgStatus } = useContractUsers(
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
  { name: 'name', label: t('contracts.users.name') },
  { name: 'family', label: t('contracts.users.family') },
  { name: 'mobile', label: t('contracts.users.mobile') },
  { name: 'nationalCode', label: t('contracts.users.nationalCode') },
  { name: 'birthDate', label: t('contracts.users.birthDate') },
  { name: 'contractAccountDeactivated', label: t('contracts.users.orgStatus') },
]);

function rowActions(item: ContractUser): TrActionItem[] {
  const isInactive = Boolean(item.contractAccountDeactivated);
  return [
    {
      id: 'toggle-status',
      label: isInactive
        ? t('contracts.actions.activate')
        : t('contracts.actions.deactivate'),
      icon: isInactive ? TrCircleCheckIcon : TrCircleSlashIcon,
      tone: isInactive ? 'success' : 'danger',
      command: () => {
        void toggleOrgStatus(item);
      },
    },
  ];
}
</script>

<template>
  <TrCard>
    <template #header>{{ t('contracts.users.title') }}</template>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error.message }}</p>
    <TrTable
      :columns="columns"
      :items="users"
      :loading="pending"
      :empty-text="t('common.empty')"
    >
      <template #item-contractaccountdeactivated="{ item }">
        {{
          !item.contractAccountDeactivated
            ? t('contracts.status.active')
            : t('contracts.status.inactive')
        }}
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

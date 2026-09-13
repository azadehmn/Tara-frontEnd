<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useContractUsers } from '../composables/use-contract-users';
import { TrButton } from '@tara/ui';

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
</script>

<template>
  <section class="flex flex-col gap-3">
    <h2 class="text-heading-sm">{{ t('contracts.users.title') }}</h2>
    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <p v-else-if="pending" class="text-sm opacity-70">{{ t('common.loading') }}</p>
    <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.name') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.family') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.mobile') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.nationalCode') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.birthDate') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.users.orgStatus') }}</th>
            <th class="px-3 py-2 text-start font-medium">{{ t('contracts.fields.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!pending && users.length === 0">
            <td colspan="7" class="px-3 py-6 text-center opacity-60">{{ t('common.empty') }}</td>
          </tr>
          <tr
            v-for="row in users"
            :key="row.id"
            class="border-t border-slate-100 dark:border-slate-800"
          >
            <td class="px-3 py-2">{{ row.name }}</td>
            <td class="px-3 py-2">{{ row.family }}</td>
            <td class="px-3 py-2">{{ row.mobile }}</td>
            <td class="px-3 py-2">{{ row.nationalCode }}</td>
            <td class="px-3 py-2">{{ row.birthDate }}</td>
            <td class="px-3 py-2">{{
              !row.contractAccountDeactivated ? t('contracts.status.active') : t('contracts.status.inactive')
            }}</td>
            <td class="px-3 py-2">
              <TrButton
                variant="outlined"
                size="small"
                :text="
                  row.contractAccountDeactivated
                    ? t('contracts.actions.activate')
                    : t('contracts.actions.deactivate')
                "
                @click="toggleOrgStatus(row)"
              />
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
  </section>
</template>

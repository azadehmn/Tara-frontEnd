<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TrButton } from '@tara/ui';
import { useContractDetail } from '../composables/use-contract-detail';
import type { ContractScope } from '../model/contract';
import ContractBatchesPanel from './ContractBatchesPanel.vue';
import ContractMerchantsPanel from './ContractMerchantsPanel.vue';
import ContractUsersPanel from './ContractUsersPanel.vue';

const props = defineProps<{
  scope: ContractScope;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const contractId = computed(() => String(route.params.id ?? ''));
const { detail, loading, error, fetchDetail } = useContractDetail(props.scope);
const tab = ref<'children' | 'batches'>('children');

onMounted(() => {
  if (contractId.value) void fetchDetail(contractId.value);
});

watch(contractId, (id) => {
  if (id) void fetchDetail(id);
});

function goBack() {
  void router.push({
    name: props.scope === 'organization' ? 'contracts-organization' : 'contracts-acquiring',
  });
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center gap-3">
      <TrButton variant="outlined" size="small" :text="t('common.back')" @click="goBack" />
      <h1 class="text-heading-lg">{{ detail?.title || t('contracts.detail.title') }}</h1>
    </div>

    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <p v-else-if="loading" class="text-sm opacity-70">{{ t('common.loading') }}</p>

    <dl
      v-if="detail"
      class="grid gap-4 rounded-lg border border-slate-200 p-4 text-sm dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.profileTitle') }}</dt>
        <dd>{{ detail.profileTitle || '—' }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.number') }}</dt>
        <dd>{{ detail.number || '—' }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.iban') }}</dt>
        <dd>{{ detail.iban || '—' }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.startDate') }}</dt>
        <dd>{{ detail.startDate }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.initDate') }}</dt>
        <dd>{{ detail.initDate }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.endDate') }}</dt>
        <dd>{{ detail.endDate }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.orgStatus') }}</dt>
        <dd>{{
          !detail.deactivatedByOrg ? t('contracts.status.active') : t('contracts.status.inactive')
        }}</dd>
      </div>
      <div>
        <dt class="opacity-60">{{ t('contracts.fields.taraStatus') }}</dt>
        <dd>{{
          !detail.disabledByTara ? t('contracts.status.active') : t('contracts.status.inactive')
        }}</dd>
      </div>
      <div class="sm:col-span-2 lg:col-span-3">
        <dt class="opacity-60">{{ t('contracts.fields.description') }}</dt>
        <dd>{{ detail.description || '—' }}</dd>
      </div>
      <div v-if="detail.tags.length" class="sm:col-span-2 lg:col-span-3">
        <dt class="mb-2 opacity-60">{{ t('contracts.fields.tags') }}</dt>
        <dd class="flex flex-wrap gap-2">
          <span
            v-for="tagItem in detail.tags"
            :key="tagItem.id"
            class="rounded-md bg-slate-100 px-2 py-1 dark:bg-slate-800"
          >
            {{ tagItem.title }}
          </span>
        </dd>
      </div>
    </dl>

    <div v-if="contractId" class="flex flex-col gap-4">
      <div class="flex gap-2">
        <TrButton
          :variant="tab === 'children' ? 'primary' : 'outlined'"
          size="small"
          :text="
            scope === 'organization' ? t('contracts.users.title') : t('contracts.merchants.title')
          "
          @click="tab = 'children'"
        />
        <TrButton
          v-if="scope === 'organization'"
          :variant="tab === 'batches' ? 'primary' : 'outlined'"
          size="small"
          :text="t('contracts.batches.title')"
          @click="tab = 'batches'"
        />
      </div>
      <ContractUsersPanel v-if="scope === 'organization' && tab === 'children'" :contract-id="contractId" />
      <ContractMerchantsPanel v-else-if="scope === 'acceptor' && tab === 'children'" :contract-id="contractId" />
      <ContractBatchesPanel v-else-if="scope === 'organization' && tab === 'batches'" :contract-id="contractId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  TrAction,
  TrCard,
  TrLabel,
  TrModal,
  TrStatus,
  TrTable,
  type TrActionItem,
  type TrTableColumn,
} from '@tara/ui';
import DetailsIcon from '@tara/ui/icons/DetailsIcon.vue';
import { formatAmount, formatNumber, formatPercent } from '@shared/utils/format';
import { bannerCampaigns, clickCampaigns } from '../config/sample-campaigns';
import { campaignStatusLabelKey, campaignStatusType } from '../lib/campaign-status';
import type { Campaign, CampaignKind } from '../model/campaign';

const props = defineProps<{
  kind: CampaignKind;
}>();

const { t, locale } = useI18n();
const selected = ref<Campaign | null>(null);

const items = computed(() => (props.kind === 'click' ? clickCampaigns : bannerCampaigns));

const columns = computed<TrTableColumn[]>(() => [
  { name: 'name', label: t('campaign.fields.name'), width: 'minmax(180px, 1.2fr)' },
  { name: 'type', label: t('campaign.fields.type'), width: 'minmax(100px, 0.5fr)' },
  { name: 'placement', label: t('campaign.fields.placement'), width: 'minmax(140px, 0.7fr)' },
  { name: 'status', label: t('campaign.fields.status'), width: 'minmax(140px, 0.7fr)' },
]);

type DetailRow = {
  id: string;
  title: string;
  value: string;
  valueLabel?: string;
};

const detailRows = computed<DetailRow[]>(() => {
  const item = selected.value;
  if (!item) return [];

  const rows: DetailRow[] = [
    { id: 'period', title: t('campaign.fields.period'), value: formatPeriod(item) },
    {
      id: 'budget',
      title: t('campaign.fields.budget'),
      value: formatAmount(item.budgetToman, locale.value),
      valueLabel: t('campaign.kpi.toman'),
    },
    {
      id: 'spent',
      title: t('campaign.fields.spent'),
      value: formatAmount(item.spentToman, locale.value),
      valueLabel: t('campaign.kpi.toman'),
    },
  ];

  if (item.bidPerClickToman != null) {
    rows.push({
      id: 'bidPerClick',
      title: t('campaign.fields.bidPerClick'),
      value: formatAmount(item.bidPerClickToman, locale.value),
      valueLabel: t('campaign.kpi.toman'),
    });
  }

  rows.push(
    {
      id: 'impressions',
      title: t('campaign.fields.impressions'),
      value: formatNumber(item.impressions, locale.value),
    },
    {
      id: 'clicks',
      title: t('campaign.fields.clicks'),
      value: formatNumber(item.clicks, locale.value),
    },
    {
      id: 'ctr',
      title: t('campaign.fields.ctr'),
      value: formatPercent(ctrOf(item), locale.value),
    },
  );

  return rows;
});

function rowActions(item: Campaign): TrActionItem[] {
  return [
    {
      id: 'details',
      label: t('campaign.actions.details'),
      icon: DetailsIcon,
      command: () => {
        selected.value = item;
      },
    },
  ];
}

function closeDetails() {
  selected.value = null;
}

function formatPeriod(item: Campaign): string {
  const start = formatDate(item.startAt);
  const end = formatDate(item.endAt);
  return t('campaign.periodRange', { start, end });
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(`${value}T00:00:00`));
}

function ctrOf(item: Campaign): number {
  if (!item.impressions) return 0;
  return (item.clicks / item.impressions) * 100;
}
</script>

<template>
  <TrCard>
    <TrTable
      :columns="columns"
      :items="items"
      :title="t('common.empty')"
      vector="NoResult"
      card-header-column="name"
      card-header-addon-column="status"
    >
      <template #item-type="{ item }">
        {{ t(`campaign.types.${item.type}`) }}
      </template>
      <template #item-placement="{ item }">
        {{ t(`campaign.placements.${item.placement}`) }}
      </template>
      <template #item-status="{ item }">
        <TrStatus
          :type="campaignStatusType(item.status)"
          :text="t(campaignStatusLabelKey(item.status))"
        />
      </template>
      <template #action="{ item }">
        <TrAction :aria-label="t('common.actions')" :items="rowActions(item)" />
      </template>
    </TrTable>
  </TrCard>

  <TrModal
    :open="Boolean(selected)"
    :title="t('campaign.actions.details')"
    :close-aria-label="t('campaign.details.close')"
    @close="closeDetails"
  >
    <div v-if="selected" class="mb-md flex items-center justify-start gap-xs">
      <h3 class="m-0 text-heading-md text-text dark:text-text-dark">
        {{ selected.name }}
      </h3>
      <TrStatus
        :type="campaignStatusType(selected.status)"
        :text="t(campaignStatusLabelKey(selected.status))"
      />
    </div>
    <div
      class="overflow-hidden rounded-md border border-solid border-[#e4e7ec] dark:border-gray-800"
    >
      <div
        v-for="row in detailRows"
        :key="row.id"
        class="flex items-center justify-between gap-md border-b border-solid border-[#e4e7ec] px-md py-sm last:border-b-0 dark:border-gray-800"
      >
        <span class="text-body-sm text-text-soft dark:text-text-dark-soft">{{ row.title }}</span>
        <span class="flex items-center gap-xs text-body-sm text-text dark:text-text-dark">
          <span>{{ row.value }}</span>
          <TrLabel v-if="row.valueLabel" :text="row.valueLabel" type="neutral" />
        </span>
      </div>
    </div>
  </TrModal>
</template>

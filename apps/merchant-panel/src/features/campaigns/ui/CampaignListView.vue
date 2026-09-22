<script setup lang="ts">
import { computed } from 'vue';
import {
  TrAction,
  TrCard,
  TrStatus,
  TrTable,
  type TrActionItem,
  type TrTableColumn,
} from '@tara/ui';
import DetailsIcon from '@tara/ui/icons/DetailsIcon.vue';
import EditIcon from '@tara/ui/icons/EditIcon.vue';
import CircleSlashIcon from '@tara/ui/icons/CircleSlashIcon.vue';
import { formatAmount, formatNumber, formatPercent } from '@shared/utils/format';
import { bannerCampaigns, clickCampaigns } from '../config/sample-campaigns';
import { campaignStatusLabelKey, campaignStatusType } from '../lib/campaign-status';
import { CampaignStatus, type Campaign, type CampaignKind } from '../model/campaign';

const props = defineProps<{
  kind: CampaignKind;
}>();

const { t, locale } = useI18n();

const items = computed(() => (props.kind === 'click' ? clickCampaigns : bannerCampaigns));

const columns = computed<TrTableColumn[]>(() => {
  const base: TrTableColumn[] = [
    { name: 'name', label: t('campaign.fields.name'), width: 'minmax(180px, 1.2fr)' },
    { name: 'type', label: t('campaign.fields.type'), width: 'minmax(100px, 0.5fr)' },
    { name: 'placement', label: t('campaign.fields.placement'), width: 'minmax(140px, 0.7fr)' },
    { name: 'status', label: t('campaign.fields.status'), width: 'minmax(140px, 0.7fr)' },
    { name: 'period', label: t('campaign.fields.period'), width: 'minmax(170px, 0.8fr)' },
    { name: 'budget', label: t('campaign.fields.budget'), width: 'minmax(130px, 0.6fr)' },
    { name: 'spent', label: t('campaign.fields.spent'), width: 'minmax(130px, 0.6fr)' },
    { name: 'impressions', label: t('campaign.fields.impressions'), width: 'minmax(110px, 0.5fr)' },
    { name: 'clicks', label: t('campaign.fields.clicks'), width: 'minmax(90px, 0.4fr)' },
    { name: 'ctr', label: t('campaign.fields.ctr'), width: 'minmax(90px, 0.4fr)' },
  ];

  if (props.kind === 'click') {
    base.splice(7, 0, {
      name: 'bidPerClick',
      label: t('campaign.fields.bidPerClick'),
      width: 'minmax(150px, 0.7fr)',
    });
  }

  return base;
});

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

function rowActions(item: Campaign): TrActionItem[] {
  return [
    {
      id: 'view',
      label: t('campaign.actions.view'),
      icon: DetailsIcon,
      command: () => undefined,
    },
    {
      id: 'edit',
      label: t('campaign.actions.edit'),
      icon: EditIcon,
      command: () => undefined,
    },
    {
      id: 'pause',
      label: t('campaign.actions.pause'),
      icon: CircleSlashIcon,
      tone: 'danger',
      active: item.status === CampaignStatus.Active,
      command: () => undefined,
    },
  ];
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
      action-width="56px"
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
      <template #item-period="{ item }">
        {{ formatPeriod(item) }}
      </template>
      <template #item-budget="{ item }">
        {{ formatAmount(item.budgetToman, locale) }}
      </template>
      <template #item-spent="{ item }">
        {{ formatAmount(item.spentToman, locale) }}
      </template>
      <template #item-bidperclick="{ item }">
        {{ item.bidPerClickToman != null ? formatAmount(item.bidPerClickToman, locale) : '—' }}
      </template>
      <template #item-impressions="{ item }">
        {{ formatNumber(item.impressions, locale) }}
      </template>
      <template #item-clicks="{ item }">
        {{ formatNumber(item.clicks, locale) }}
      </template>
      <template #item-ctr="{ item }">
        {{ formatPercent(ctrOf(item), locale) }}
      </template>
      <template #action="{ item }">
        <TrAction :aria-label="t('common.actions')" :items="rowActions(item)" />
      </template>
    </TrTable>
  </TrCard>
</template>

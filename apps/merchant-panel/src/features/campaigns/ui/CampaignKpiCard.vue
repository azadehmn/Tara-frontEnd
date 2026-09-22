<script setup lang="ts">
import { computed } from 'vue';
import { TrCard } from '@tara/ui';
import { formatAmount, formatNumber, formatPercent } from '@shared/utils/format';
import { campaignKpiSamples } from '../config/sample-kpis';
import type { CampaignKind } from '../model/campaign-kpi';

const props = defineProps<{
  kind: CampaignKind;
}>();

const { t, locale } = useI18n();
const kpi = computed(() => campaignKpiSamples[props.kind]);

const items = computed(() => {
  const data = kpi.value;
  return [
    {
      key: 'spend',
      label: t('campaign.kpi.spend'),
      value: `${formatAmount(data.spendToman, locale.value)} ${t('campaign.kpi.toman')}`,
    },
    {
      key: 'impressions',
      label: t('campaign.kpi.impressions'),
      value: formatNumber(data.impressions, locale.value),
    },
    {
      key: 'clicks',
      label: t('campaign.kpi.clicks'),
      value: formatNumber(data.clicks, locale.value),
    },
    {
      key: 'ctr',
      label: t('campaign.kpi.ctr'),
      value: formatPercent(data.ctr, locale.value),
    },
    {
      key: 'active',
      label: t('campaign.kpi.active'),
      value: formatNumber(data.activeCampaigns, locale.value),
    },
  ];
});
</script>

<template>
  <TrCard padding="none">
    <dl class="campaign-kpi">
      <div v-for="item in items" :key="item.key" class="campaign-kpi__cell">
        <dt class="campaign-kpi__label">{{ item.label }}</dt>
        <dd class="campaign-kpi__value">{{ item.value }}</dd>
      </div>
      <div class="campaign-kpi__cell is-empty" aria-hidden="true" />
    </dl>
  </TrCard>
</template>

<style scoped>
.campaign-kpi {
  display: grid;
  margin: 0;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .campaign-kpi {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.campaign-kpi__cell {
  margin: 0;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border-divider);
  border-inline-start: 1px solid var(--color-border-divider);
}

.campaign-kpi__cell:nth-child(3n + 1) {
  border-inline-start: none;
}

.campaign-kpi__cell:nth-child(n + 4) {
  border-bottom: none;
}

.campaign-kpi__cell.is-empty {
  display: none;
}

@media (min-width: 768px) {
  .campaign-kpi__cell.is-empty {
    display: block;
  }
}

@media (max-width: 767px) {
  .campaign-kpi__cell {
    border-inline-start: none;
  }

  .campaign-kpi__cell:nth-child(n + 4) {
    border-bottom: 1px solid var(--color-border-divider);
  }

  .campaign-kpi__cell:nth-child(5) {
    border-bottom: none;
  }
}

html[data-theme='dark'] .campaign-kpi__cell {
  border-color: var(--color-gray-800, #1d2939);
}

.campaign-kpi__label {
  margin: 0 0 0.35rem;
  color: var(--color-text-soft);
  font-size: var(--text-body-sm);
  font-weight: 500;
  line-height: var(--text-body-sm--line-height);
}

html[data-theme='dark'] .campaign-kpi__label {
  color: var(--color-text-dark-soft);
}

.campaign-kpi__value {
  margin: 0;
  color: var(--color-text);
  font-size: var(--text-body-md);
  font-weight: 600;
  line-height: var(--text-body-md--line-height);
}

html[data-theme='dark'] .campaign-kpi__value {
  color: var(--color-text-dark);
}
</style>

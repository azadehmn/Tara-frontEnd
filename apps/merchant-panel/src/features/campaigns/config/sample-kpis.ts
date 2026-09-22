import type { CampaignKind, CampaignKpi } from '../model/campaign-kpi';

export const campaignKpiSamples: Record<CampaignKind, CampaignKpi> = {
  banner: {
    spendToman: 18_400_000,
    impressions: 128_430,
    clicks: 6_432,
    ctr: 5.01,
    activeCampaigns: 3,
  },
  click: {
    spendToman: 9_750_000,
    impressions: 84_210,
    clicks: 12_180,
    ctr: 14.46,
    activeCampaigns: 5,
  },
};

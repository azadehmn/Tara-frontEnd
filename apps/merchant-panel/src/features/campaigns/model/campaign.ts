export type CampaignKind = 'banner' | 'click';

export const CampaignStatus = {
  Draft: 'DRAFT',
  PendingReview: 'PENDING_REVIEW',
  Scheduled: 'SCHEDULED',
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Completed: 'COMPLETED',
  Rejected: 'REJECTED',
} as const;

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];

export const CAMPAIGN_STATUSES = Object.values(CampaignStatus);

export function isCampaignStatus(value: string): value is CampaignStatus {
  return (CAMPAIGN_STATUSES as string[]).includes(value);
}

export const CampaignPlacement = {
  Home: 'HOME',
  Search: 'SEARCH',
  MerchantList: 'MERCHANT_LIST',
  Category: 'CATEGORY',
  Product: 'PRODUCT',
} as const;

export type CampaignPlacement = (typeof CampaignPlacement)[keyof typeof CampaignPlacement];

export type Campaign = {
  id: string;
  name: string;
  type: CampaignKind;
  placement: CampaignPlacement;
  status: CampaignStatus;
  startAt: string;
  endAt: string;
  budgetToman: number;
  spentToman: number;
  impressions: number;
  clicks: number;
  bidPerClickToman?: number;
};

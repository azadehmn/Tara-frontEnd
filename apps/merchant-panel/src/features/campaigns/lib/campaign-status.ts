import type { TrStatusType } from '@tara/ui';
import { CampaignStatus } from '../model/campaign';

const STATUS_TYPES: Record<CampaignStatus, TrStatusType> = {
  [CampaignStatus.Draft]: 'neutral',
  [CampaignStatus.PendingReview]: 'warning',
  [CampaignStatus.Scheduled]: 'informative',
  [CampaignStatus.Active]: 'positive',
  [CampaignStatus.Paused]: 'warning',
  [CampaignStatus.Completed]: 'neutral',
  [CampaignStatus.Rejected]: 'negative',
};

export function campaignStatusType(status: CampaignStatus): TrStatusType {
  return STATUS_TYPES[status];
}

export function campaignStatusLabelKey(
  status: CampaignStatus,
): `campaign.statuses.${CampaignStatus}` {
  return `campaign.statuses.${status}`;
}

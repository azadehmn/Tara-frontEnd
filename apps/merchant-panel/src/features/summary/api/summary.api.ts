import { clubClient } from '@shared/api/clients/club.client';
import { SUMMARY_USE_MOCK } from '../config/data-source';
import type { MerchantSummary } from '../model/summary';
import { summaryEndpoints } from './endpoints';
import { mapMerchantSummary } from './mappers/summary.mapper';
import { summaryMock } from './summary.mock';

export async function getMerchantSummary(): Promise<MerchantSummary> {
  const payload = SUMMARY_USE_MOCK
    ? summaryMock
    : await clubClient.get<unknown>(summaryEndpoints.summary);

  return mapMerchantSummary(payload);
}

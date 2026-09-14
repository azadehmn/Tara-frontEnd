import { clubClient } from '@shared/api/clients/club.client';
import { normalizePage, type Paginated } from '@shared/api/normalize/page';
import type { ContractMerchant, ContractMerchantDto } from '../model/merchant';
import { buildClubListRequest, type ListQuery } from '../model/search';
import { contractEndpoints } from './endpoints';
import { mapContractMerchant } from './mappers/merchant.mapper';

export async function listContractMerchants(
  contractId: string | number,
  query: ListQuery,
): Promise<Paginated<ContractMerchant>> {
  const payload = await clubClient.post<unknown>(
    contractEndpoints.merchants(contractId),
    buildClubListRequest(query),
  );
  const page = normalizePage<ContractMerchantDto>(payload);
  return { items: page.items.map(mapContractMerchant), total: page.total };
}

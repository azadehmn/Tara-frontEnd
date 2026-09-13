import { clubClient } from '@shared/api/clients/club.client';
import { normalizePage, type Paginated } from '@shared/api/normalize/page';
import { buildClubListRequest, type ListQuery } from '../model/search';
import type { ContractUser, ContractUserDto } from '../model/user';
import { contractEndpoints } from './endpoints';
import { mapContractUser } from './mappers/user.mapper';

export async function listContractUsers(
  contractId: string | number,
  query: ListQuery,
): Promise<Paginated<ContractUser>> {
  const payload = await clubClient.post<unknown>(
    contractEndpoints.users(contractId),
    buildClubListRequest(query),
  );
  const page = normalizePage<ContractUserDto>(payload);
  return { items: page.items.map(mapContractUser), total: page.total };
}

export async function setContractUserOrgStatus(
  userId: number,
  contractId: string | number,
  activate: boolean,
): Promise<void> {
  const path = activate
    ? contractEndpoints.activateUser(userId, contractId)
    : contractEndpoints.deactivateUser(userId, contractId);
  await clubClient.post(path, {});
}

export async function changeContractUserMobile(input: {
  contractId: string | number;
  mobile: string;
  newMobile: string;
}): Promise<void> {
  await clubClient.post(contractEndpoints.changeMobile, input);
}

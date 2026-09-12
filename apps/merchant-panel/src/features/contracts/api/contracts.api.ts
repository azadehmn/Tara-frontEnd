import { clubClient } from '@shared/api/clients/club.client';
import { normalizePage, type Paginated } from '@shared/api/normalize/page';
import type {
  ContractDetail,
  ContractListFilters,
  ContractListItem,
  ContractScope,
} from '../model/contract';
import { ClubContractTypeCode } from '../model/contract';
import {
  FilterOperation,
  buildClubListRequest,
  criterion,
  type ListQuery,
  type SearchCriterion,
} from '../model/search';
//*
//  sepration endpoint construction && response mapping
//*
import { contractEndpoints } from './endpoints';
import { mapContractDetail, mapContractListItem } from './mappers/contract.mapper';

export async function listContracts(
  // organization list or acceptor
  scope: ContractScope,
  // pagination && filter
  query: ListQuery & { filters?: ContractListFilters },
): Promise<Paginated<ContractListItem>> {
  // scope filters + user filter
  const search = [...buildScopeFilters(scope), ...buildListFilters(query.filters ?? {})];
  const payload = await clubClient.post<unknown>(
    contractEndpoints.list,
    buildClubListRequest({ ...query, search }),
  );
  const page = normalizePage<unknown>(payload);
  return { items: page.items.map(mapContractListItem), total: page.total };
}

export async function getOrganizationContract(id: string | number): Promise<ContractDetail> {
  const payload = await clubClient.get<unknown>(contractEndpoints.organizationDetail(id));
  return mapContractDetail(payload);
}

export async function getAcceptorContract(id: string | number): Promise<ContractDetail> {
  const payload = await clubClient.post<unknown>(contractEndpoints.acceptorDetail(id), {});
  return mapContractDetail(payload);
}

export async function setContractOrgStatus(id: number, activate: boolean): Promise<void> {
  const path = activate ? contractEndpoints.activate(id) : contractEndpoints.deactivate(id);
  await clubClient.post(path, { contractId: id });
}

export async function setContractTaraStatus(id: number, enable: boolean): Promise<void> {
  const path = enable ? contractEndpoints.enable(id) : contractEndpoints.disable(id);
  await clubClient.post(path, {});
}

function buildScopeFilters(scope: ContractScope): SearchCriterion[] {
  if (scope === 'organization') {
    return [
      criterion('type', FilterOperation.IN, [
        ClubContractTypeCode.Credit,
        ClubContractTypeCode.Cash,
      ]),
    ];
  }

  return [criterion('type', FilterOperation.EQUALITY, ClubContractTypeCode.Acceptor)];
}

function buildListFilters(filters: ContractListFilters): SearchCriterion[] {
  const search: SearchCriterion[] = [];
  if (filters.id) search.push(criterion('id', FilterOperation.EQUALITY, Number(filters.id)));
  if (filters.title) search.push(criterion('title', FilterOperation.LIKE, filters.title));
  if (filters.profileTitle) {
    search.push(criterion('profileTitle', FilterOperation.LIKE, filters.profileTitle));
  }
  if (filters.fromDate) {
    search.push(criterion('fromDate', FilterOperation.GREATER_EQUALITY_THAN, filters.fromDate));
  }
  if (filters.toDate) {
    search.push(criterion('toDate', FilterOperation.LESS_EQUALITY_THAN, filters.toDate));
  }
  return search;
}

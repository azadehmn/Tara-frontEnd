export const FilterOperation = {
  IN: 'IN',
  EQUALITY: 'EQUALITY',
  LIKE: 'LIKE',
  NOT_EQUALITY: 'NOT_EQUALITY',
  GREATER_EQUALITY_THAN: 'GREATER_EQUALITY_THAN',
  LESS_EQUALITY_THAN: 'LESS_EQUALITY_THAN',
} as const;

export type FilterOperation = (typeof FilterOperation)[keyof typeof FilterOperation];

export interface SearchCriterion {
  key: string;
  operation: FilterOperation;
  value: unknown[];
}

export interface ClubPageRequest {
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}

export interface ClubListRequest {
  page: ClubPageRequest;
  search: SearchCriterion[];
}

export interface ListQuery {
  page: number;
  size: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
  search?: SearchCriterion[];
}

export function buildClubListRequest(query: ListQuery): ClubListRequest {
  return {
    page: {
      page: Math.max(query.page - 1, 0),
      size: query.size,
      sort: query.sort ?? 'id',
      direction: query.direction ?? 'DESC',
    },
    search: query.search ?? [],
  };
}

export function criterion(
  key: string,
  operation: FilterOperation,
  value: unknown,
): SearchCriterion {
  return { key, operation, value: Array.isArray(value) ? value : [value] };
}

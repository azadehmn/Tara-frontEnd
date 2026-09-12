import { reactive, ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { listContracts } from '../api/contracts.api';
import type { ContractListFilters, ContractListItem, ContractScope } from '../model/contract';

export function useContractList(scope: ContractScope) {
  //*
  // STATE BLOCK
  //*
  const contracts = ref<ContractListItem[]>([]);
  const total = ref(0);
  const page = ref(1);
  const size = ref(10);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);
  const filters = reactive<ContractListFilters>({});

  async function fetchList(resetPage = false): Promise<void> {
    if (resetPage) page.value = 1;
    pending.value = true;
    error.value = null;
    try {
      const result = await listContracts(scope, {
        page: page.value,
        size: size.value,
        filters: { ...filters },
      });
      contracts.value = result.items;
      total.value = result.total;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError({ message: String(cause) });
      contracts.value = [];
      total.value = 0;
    } finally {
      pending.value = false;
    }
  }

  return { contracts, total, page, size, pending, error, filters, fetchList };
}

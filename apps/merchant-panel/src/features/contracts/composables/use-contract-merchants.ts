import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { listContractMerchants } from '../api/merchants.api';
import type { ContractMerchant } from '../model/merchant';

export function useContractMerchants(contractId: () => string) {
  const merchants = ref<ContractMerchant[]>([]);
  const total = ref(0);
  const page = ref(1);
  const size = ref(10);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);

  async function fetch(resetPage = false): Promise<void> {
    if (resetPage) page.value = 1;
    const id = contractId();
    if (!id) return;
    pending.value = true;
    error.value = null;
    try {
      const result = await listContractMerchants(id, { page: page.value, size: size.value });
      merchants.value = result.items;
      total.value = result.total;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      merchants.value = [];
      total.value = 0;
    } finally {
      pending.value = false;
    }
  }

  return { merchants, total, page, size, pending, error, fetch };
}

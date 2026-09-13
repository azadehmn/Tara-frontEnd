import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { getAcceptorContract, getOrganizationContract } from '../api/contracts.api';
import type { ContractDetail, ContractScope } from '../model/contract';

export function useContractDetail(scope: ContractScope) {
  const contractDetail = ref<ContractDetail | null>(null);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);

  async function fetch(id: string | number): Promise<void> {
    pending.value = true;
    error.value = null;
    try {
      contractDetail.value =
        scope === 'organization'
          ? await getOrganizationContract(id)
          : await getAcceptorContract(id);
    } catch (cause) {
      contractDetail.value = null;
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
    } finally {
      pending.value = false;
    }
  }

  return { contractDetail, pending, error, fetch };
}

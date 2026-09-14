import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { listContractUsers, setContractUserOrgStatus } from '../api/users.api';
import type { ContractUser } from '../model/user';

export function useContractUsers(contractId: () => string) {
  const users = ref<ContractUser[]>([]);
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
      const result = await listContractUsers(id, { page: page.value, size: size.value });
      users.value = result.items;
      total.value = result.total;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      users.value = [];
      total.value = 0;
    } finally {
      pending.value = false;
    }
  }

  async function toggleOrgStatus(user: ContractUser): Promise<void> {
    await setContractUserOrgStatus(user.id, contractId(), user.contractAccountDeactivated);
    await fetch();
  }

  return { users, total, page, size, pending, error, fetch, toggleOrgStatus };
}

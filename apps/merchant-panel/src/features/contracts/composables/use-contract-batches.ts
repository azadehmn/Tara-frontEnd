import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { listContractBatches, pauseContractBatch, runContractBatch } from '../api/batches.api';
import type { ContractBatch } from '../model/batch';

export function useContractBatches(contractId: () => string) {
  const batches = ref<ContractBatch[]>([]);
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
      const result = await listContractBatches(id, { page: page.value, size: size.value });
      batches.value = result.items;
      total.value = result.total;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      batches.value = [];
      total.value = 0;
    } finally {
      pending.value = false;
    }
  }

  async function run(batch: ContractBatch): Promise<void> {
    await runContractBatch(batch.batchId, batch.meta);
    await fetch();
  }

  async function pause(batch: ContractBatch): Promise<void> {
    await pauseContractBatch(batch.batchId);
    await fetch();
  }

  return { batches, total, page, size, pending, error, fetch, run, pause };
}

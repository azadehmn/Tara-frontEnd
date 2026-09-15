import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { getMerchantSummary } from '../api/summary.api';
import type { MerchantSummary } from '../model/summary';

export function useSummary() {
  const summary = ref<MerchantSummary | null>(null);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);

  async function fetch(): Promise<void> {
    pending.value = true;
    error.value = null;
    try {
      summary.value = await getMerchantSummary();
    } catch (cause) {
      summary.value = null;
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
    } finally {
      pending.value = false;
    }
  }

  return { summary, pending, error, fetch };
}

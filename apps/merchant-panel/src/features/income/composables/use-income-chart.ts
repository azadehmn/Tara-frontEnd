import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { getIncomeChart } from '../api/income-chart.api';
import { IncomeChartPeriod, type IncomeChart } from '../model/income-chart';

export function useIncomeChart() {
  const period = ref<IncomeChartPeriod>(IncomeChartPeriod.Monthly);
  const chart = ref<IncomeChart | null>(null);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);

  async function fetch(): Promise<void> {
    pending.value = true;
    error.value = null;
    try {
      chart.value = await getIncomeChart(period.value);
    } catch (cause) {
      chart.value = null;
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
    } finally {
      pending.value = false;
    }
  }

  async function setPeriod(next: IncomeChartPeriod): Promise<void> {
    if (period.value === next && chart.value) return;
    period.value = next;
    await fetch();
  }

  return { period, chart, pending, error, fetch, setPeriod };
}

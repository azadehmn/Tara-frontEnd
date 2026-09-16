export type TrendDirection = 'increase' | 'decrease' | 'neutral';

export type TrendResult =
  | { kind: 'new'; percentage: null; direction: 'neutral' }
  | { kind: 'change'; percentage: number; direction: TrendDirection };
// Calculate the percentage change between current and previous values.
export function calculateTrend(current: number, previous: number): TrendResult {
  // Avoid division by zero when there is no previous value.
  if (previous === 0) {
    // A percentage cannot be calculated when the previous value is zero.

    if (current === 0) return { kind: 'change', percentage: 0, direction: 'neutral' };
    return { kind: 'new', percentage: null, direction: 'neutral' };
  }

  const percentage = ((current - previous) / Math.abs(previous)) * 100;
  // No change between current and previous values.

  if (percentage === 0) return { kind: 'change', percentage, direction: 'neutral' };

  return {
    kind: 'change',
    percentage,
    direction: percentage > 0 ? 'increase' : 'decrease',
  };
}

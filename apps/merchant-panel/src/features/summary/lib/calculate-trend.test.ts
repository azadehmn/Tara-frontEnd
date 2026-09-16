import { describe, expect, it } from 'vitest';
import { calculateTrend } from './calculate-trend';

describe('calculateTrend', () => {
  it('marks a higher sales value as positive', () => {
    expect(calculateTrend(120, 100)).toEqual({
      kind: 'change',
      percentage: 20,
      direction: 'increase',
    });
  });

  it('reports a lower value as a decrease', () => {
    expect(calculateTrend(80, 100).direction).toBe('decrease');
  });

  it('does not assign business meaning to the direction', () => {
    expect(calculateTrend(2, 4).direction).toBe('decrease');
  });

  it('handles zero previous values without infinity', () => {
    expect(calculateTrend(10, 0)).toEqual({
      kind: 'new',
      percentage: null,
      direction: 'neutral',
    });
    expect(calculateTrend(0, 0)).toEqual({
      kind: 'change',
      percentage: 0,
      direction: 'neutral',
    });
  });
});

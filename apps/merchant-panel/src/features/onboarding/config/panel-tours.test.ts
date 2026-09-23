import { describe, expect, it } from 'vitest';
import { dashboardTour, TOUR_VERSION } from './panel-tours';
import { tourStorageKey, tourVersionLabel } from '../model/tour';

describe('dashboard tour config', () => {
  it('uses a versioned localStorage key that can bump independently', () => {
    expect(tourVersionLabel(dashboardTour)).toBe('dashboard-v2');
    expect(TOUR_VERSION).toBe('dashboard-v2');
    expect(tourStorageKey(dashboardTour)).toBe('tara:onboarding:dashboard:v2');
  });

  it('anchors important first-run actions', () => {
    const steps = dashboardTour.steps((key) => key);

    expect(steps.map((step) => step.element)).toEqual([
      '[data-tour="profile"]',
      '[data-tour="tickets"]',
      '[data-tour="navigation"]',
      '[data-tour="income"]',
      '[data-tour="income-period"]',
      '[data-tour="summary"]',
      '[data-tour="contracts"]',
      '[data-tour="contract-list"]',
    ]);
    expect(steps.at(-2)?.advanceOnClick).toBe(true);
    expect(steps.at(-1)?.doneOnly).toBe(true);
    expect(steps.at(-1)?.routeNames).toEqual([
      'contracts-organization',
      'contracts-acceptor',
    ]);
  });
});

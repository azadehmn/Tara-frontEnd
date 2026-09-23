import { describe, expect, it } from 'vitest';
import { firstVisibleTourTarget, resolveTourSteps } from './resolve-tour-steps';

describe('resolveTourSteps', () => {
  it('keeps the first visible match and drops hidden or missing targets', () => {
    document.body.innerHTML = `
      <div data-tour="profile" style="width: 40px; height: 40px"></div>
      <div data-tour="tickets" hidden style="width: 40px; height: 40px"></div>
      <div data-tour="income" style="display: none; width: 40px; height: 40px"></div>
    `;
    mockRect('[data-tour="profile"]', 40, 40);
    mockRect('[data-tour="tickets"]', 40, 40);
    mockRect('[data-tour="income"]', 40, 40);

    const steps = resolveTourSteps([
      { element: '[data-tour="profile"]', title: 'Profile', intro: 'Account' },
      { element: '[data-tour="tickets"]', title: 'Tickets', intro: 'Support' },
      { element: '[data-tour="income"]', title: 'Income', intro: 'Chart' },
      { element: '[data-tour="missing"]', title: 'Missing', intro: 'Gone' },
    ]);

    expect(steps.map((step) => step.element)).toEqual(['[data-tour="profile"]']);
  });

  it('keeps a step that is shown after navigation', () => {
    document.body.innerHTML = '';

    const steps = resolveTourSteps([
      { element: '[data-tour="missing"]', title: 'Missing', intro: 'Gone' },
      {
        element: '[data-tour="contract-list"]',
        title: 'Contracts',
        intro: 'List',
        routeNames: ['contracts-organization'],
      },
    ]);

    expect(steps.map((step) => step.element)).toEqual(['[data-tour="contract-list"]']);
  });

  it('prefers a visible duplicate over a hidden one', () => {
    document.body.innerHTML = `
      <div data-tour="navigation" hidden style="width: 40px; height: 40px"></div>
      <nav data-tour="navigation" style="width: 80px; height: 80px"></nav>
    `;
    mockRect('div[data-tour="navigation"]', 40, 40);
    mockRect('nav[data-tour="navigation"]', 80, 80);

    expect(firstVisibleTourTarget('[data-tour="navigation"]')?.tagName).toBe('NAV');
  });
});

function mockRect(selector: string, width: number, height: number) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLElement)) return;
  element.getBoundingClientRect = () =>
    ({
      width,
      height,
      top: 0,
      left: 0,
      bottom: height,
      right: width,
      x: 0,
      y: 0,
      toJSON() {
        return {};
      },
    }) as DOMRect;
}

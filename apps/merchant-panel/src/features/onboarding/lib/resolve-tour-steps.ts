import type { TourStep } from '../model/tour';

// Check if the tour target is visible
export function isTourTargetVisible(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest('[hidden]')) return false;

  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}
// Find the first visible target
export function firstVisibleTourTarget(selector: string, root: ParentNode = document): HTMLElement | null {
  const matches = root.querySelectorAll(selector);
  for (const match of matches) {
    if (match instanceof HTMLElement && isTourTargetVisible(match)) return match;
  }
  return null;
}
// Remove steps with hidden or missing targets
export function resolveTourSteps(steps: TourStep[], root: ParentNode = document): TourStep[] {
  return steps.filter((step) => Boolean(firstVisibleTourTarget(step.element, root)));
}

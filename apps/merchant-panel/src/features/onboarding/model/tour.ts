export type TourStep = {
  element: string;
  title: string;
  intro: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Routes where this step's target is rendered. The tour navigates before showing it. */
  routeNames?: readonly string[];
  /** Clicking the highlighted element advances the tour, same as Next. */
  advanceOnClick?: boolean;
  /** Last step: only the done button, without back or close. */
  doneOnly?: boolean;
};

// Translation function for tour texts
export type TourCopy = (key: string) => string;

// Defines a tour, its version, routes, and steps
export type TourDefinition = {
  id: string;
  version: string;
  routeNames: readonly string[];
  steps: (t: TourCopy) => TourStep[];
};
// for example tara:onboarding:dashboard:v1
export function tourStorageKey(tour: Pick<TourDefinition, 'id' | 'version'>): string {
  return `tara:onboarding:${tour.id}:${tour.version}`;
}
// Returns the tour id with its version
export function tourVersionLabel(tour: Pick<TourDefinition, 'id' | 'version'>): string {
  return `${tour.id}-${tour.version}`;
}

import type { TourDefinition } from '../model/tour';
import { tourVersionLabel } from '../model/tour';

export const dashboardTour = {
  id: 'dashboard',
  version: 'v2',
  routeNames: ['dashboard'],
  steps: (t) => [
    {
      element: '[data-tour="profile"]',
      title: t('onboarding.dashboard.profile.title'),
      intro: t('onboarding.dashboard.profile.intro'),
      side: 'bottom',
      align: 'end',
    },
    {
      element: '[data-tour="tickets"]',
      title: t('onboarding.dashboard.tickets.title'),
      intro: t('onboarding.dashboard.tickets.intro'),
      side: 'left',
    },
    {
      element: '[data-tour="navigation"]',
      title: t('onboarding.dashboard.navigation.title'),
      intro: t('onboarding.dashboard.navigation.intro'),
      side: 'left',
    },
    {
      element: '[data-tour="income"]',
      title: t('onboarding.dashboard.income.title'),
      intro: t('onboarding.dashboard.income.intro'),
      side: 'bottom',
    },
    {
      element: '[data-tour="income-period"]',
      title: t('onboarding.dashboard.incomePeriod.title'),
      intro: t('onboarding.dashboard.incomePeriod.intro'),
      side: 'bottom',
      align: 'end',
    },
    {
      element: '[data-tour="summary"]',
      title: t('onboarding.dashboard.summary.title'),
      intro: t('onboarding.dashboard.summary.intro'),
      side: 'left',
    },
    {
      element: '[data-tour="contracts"]',
      title: t('onboarding.dashboard.contracts.title'),
      intro: t('onboarding.dashboard.contracts.intro'),
      side: 'left',
      advanceOnClick: true,
    },
    {
      element: '[data-tour="contract-list"]',
      title: t('onboarding.contracts.list.title'),
      intro: t('onboarding.contracts.list.intro'),
      side: 'bottom',
      routeNames: ['contracts-organization', 'contracts-acceptor'],
      doneOnly: true,
    },
  ],
} as const satisfies TourDefinition;

/** Permission required before the tour may open that route. */
export const tourRoutePermissions: Record<string, string> = {
  'contracts-organization': 'contractsGuarantor',
  'contracts-acceptor': 'contractsMerchant',
};

export const panelTours: readonly TourDefinition[] = [dashboardTour];

export const TOUR_VERSION = tourVersionLabel(dashboardTour);

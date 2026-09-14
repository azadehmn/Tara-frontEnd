import { describe, expect, it } from 'vitest';
import { mapContractDetail, mapContractListItem } from './contract.mapper';

describe('mapContractListItem', () => {
  it('renames Club deactivated/disabled into domain flags', () => {
    expect(
      mapContractListItem({
        id: 12,
        title: 'Org A',
        profileTitle: 'Acme',
        type: 'Credit',
        endDate: '2026-01-01',
        isEnabled: true,
        deactivated: true,
        disabled: false,
      }),
    ).toMatchObject({
      id: 12,
      deactivatedByOrg: true,
      disabledByTara: false,
    });
  });
});

describe('mapContractDetail', () => {
  it('pulls wallet fields off the detail payload', () => {
    const detail = mapContractDetail({
      id: 1,
      title: 'Org',
      tags: [{ id: 2, title: 'gold', key: 'GOLD', type: 'ORG_CONTRACT' }],
      gradientStart: '#000',
      gradientEnd: '#fff',
      orgLogoUrl: '/logo.png',
      textColor: '#111',
      groupAccount: { title: 'Cash' },
    });

    expect(detail.tags).toHaveLength(1);
    expect(detail.wallet?.accountTitle).toBe('Cash');
  });
});

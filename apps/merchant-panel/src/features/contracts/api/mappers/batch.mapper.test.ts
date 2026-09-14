import { describe, expect, it } from 'vitest';
import { mapContractBatch } from './batch.mapper';

describe('mapContractBatch', () => {
  it('reads title and batchType from the nested batch object', () => {
    const mapped = mapContractBatch({
      id: 15982,
      definitionId: 1134,
      createdOn: '2026-09-13T05:44:44.347+00:00',
      batchId: 31960,
      batch: {
        id: 31960,
        documentId: 9989,
        documentUrl:
          'https://stage.tara-club.ir/club/api/doc/bo/v1/download/contract/org/attachment/1448316847-4c21e5ec-cfaa-468e-9ac0-c31ff20436d6',
        title: 'tes',
        batchType: 'ENABLED',
        state: 'CREATED',
        meta: null,
        deactivated: false,
        disabled: false,
      },
    });

    expect(mapped).toEqual({
      id: 15982,
      batchId: 31960,
      title: 'tes',
      batchType: 'ENABLED',
      state: 'CREATED',
      createdOn: '2026-09-13T05:44:44.347+00:00',
      documentUrl:
        'https://stage.tara-club.ir/club/api/doc/bo/v1/download/contract/org/attachment/1448316847-4c21e5ec-cfaa-468e-9ac0-c31ff20436d6',
      meta: null,
    });
  });
});

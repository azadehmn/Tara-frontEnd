import { clubClient } from '@shared/api/clients/club.client';
import { normalizePage, type Paginated } from '@shared/api/normalize/page';
import type {
  ContractBatch,
  ContractBatchDto,
  CreateContractBatchInput,
  UploadedDocument,
} from '../model/batch';
import { ContractBatchTypeFilter } from '../model/batch';
import {
  FilterOperation,
  buildClubListRequest,
  criterion,
  type ListQuery,
} from '../model/search';
import { contractEndpoints } from './endpoints';
import { mapContractBatch, mapUploadedDocument } from './mappers/batch.mapper';

export async function listContractBatches(
  contractId: string | number,
  query: ListQuery,
): Promise<Paginated<ContractBatch>> {
  const search = [
    ...(query.search ?? []),
    criterion('contractId', FilterOperation.EQUALITY, String(contractId)),
    criterion('batchType', FilterOperation.IN, [[...ContractBatchTypeFilter]]),
  ];
  const payload = await clubClient.post<unknown>(
    contractEndpoints.batches,
    buildClubListRequest({ ...query, search }),
  );
  const page = normalizePage<ContractBatchDto>(payload);
  return { items: page.items.map(mapContractBatch), total: page.total };
}

export async function uploadContractAttachment(file: File): Promise<UploadedDocument> {
  const form = new FormData();
  form.append('file', file, file.name);
  form.append(
    'docInfo',
    new Blob(
      [
        JSON.stringify({
          title: file.name,
          tag: file.type,
          path: '',
          description: '',
        }),
      ],
      { type: 'application/json' },
    ),
  );
  const payload = await clubClient.post<unknown>(contractEndpoints.uploadAttachment, form);
  return mapUploadedDocument(payload);
}

export async function createContractBatch(input: CreateContractBatchInput): Promise<void> {
  await clubClient.post(contractEndpoints.createBatch, input);
}

export async function runContractBatch(batchInternalId: number, meta?: unknown): Promise<void> {
  await clubClient.post(contractEndpoints.runBatch(batchInternalId), meta ?? []);
}

export async function pauseContractBatch(batchId: number): Promise<void> {
  await clubClient.post(contractEndpoints.pauseBatch(batchId), null);
}

export async function getBatchStatusHistory(batchId: number): Promise<unknown[]> {
  const payload = await clubClient.get<unknown>(contractEndpoints.batchStatus(batchId));
  return Array.isArray(payload) ? payload : [];
}

export async function downloadDocument(url: string): Promise<Blob> {
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/^\/club\/api\//, '');
  return clubClient.get<Blob>(path, { responseType: 'blob' });
}

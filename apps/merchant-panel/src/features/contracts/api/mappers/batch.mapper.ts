import type { ContractBatch, ContractBatchDto, UploadedDocument } from '../../model/batch';

export function mapContractBatch(dto: ContractBatchDto): ContractBatch {
  return {
    id: dto.id,
    batchId: dto.batchId,
    title: dto.batch.title,
    batchType: dto.batch.batchType,
    state: dto.batch.state,
    createdOn: dto.createdOn,
    documentUrl: dto.batch.documentUrl,
    meta: dto.batch.meta,
  };
}
/**----------------------------------------------------------
إFile Response Upload
--------------------------- */
export function mapUploadedDocument(raw: unknown): UploadedDocument {
  const row = asRecord(raw) ?? {};
  return {
    documentId: Number(row.docId ?? row.documentId ?? 0),
    downloadUrl: String(row.downloadUrl ?? ''),
  };
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

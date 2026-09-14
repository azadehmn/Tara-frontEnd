export const UserBatchType = {
  Add: 1,
  Deactivate: 3,
  Activate: 17,
} as const;

export type UserBatchType = (typeof UserBatchType)[keyof typeof UserBatchType];

export const ChargeBatchTypes = [0, 4, 5, 6, 7] as const;

export const ContractBatchTypeFilter = [0, 1, 3, 4, 5, 6, 7, 17] as const;

export interface ContractBatchDto {
  id: number;
  definitionId: number;
  createdOn: string;
  batchId: number;
  batch: {
    id: number;
    documentId: number;
    documentUrl: string;
    title: string;
    batchType: string;
    state: string;
    meta: unknown;
    deactivated: boolean;
    disabled: boolean;
  };
}

export interface ContractBatch {
  id: number;
  batchId: number;
  title: string;
  batchType: string;
  state: string;
  createdOn: string;
  documentUrl: string;
  meta: unknown;
}

export interface CreateContractBatchInput {
  batchType: number;
  definitionId: number;
  documentId: number;
  documentUrl: string;
  title: string;
  description: string;
}

export interface UploadedDocument {
  documentId: number;
  downloadUrl: string;
}

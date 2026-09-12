export const contractEndpoints = {
  // Contracts
  list: 'bo/contract/limited/v1/list',
  activate: (id: number | string) => `bo/contract/v1/active/${id}`,
  deactivate: (id: number | string) => `bo/contract/v1/deactivate/${id}`,
  enable: (id: number | string) => `bo/contract/v1/enabled/${id}`,
  disable: (id: number | string) => `bo/contract/v1/disable/${id}`,
  organizationDetail: (id: number | string) => `bo/contract/org/limited/v1/detail/${id}`,
  acceptorDetail: (id: number | string) => `bo/contract/acceptor/limited/v1/${id}/detail`,

  // Merchants
  merchants: (id: number | string) => `bo/contract/acceptor/limited/v1/${id}/merchant/list`,

  // Users
  users: (id: number | string) => `bo/contracts/limited/v1/${id}/profiles/list`,
  activateUser: (userId: number | string, contractId: number | string) =>
    `bo/contracts/limited/v1/user/active/${userId}/${contractId}`,
  deactivateUser: (userId: number | string, contractId: number | string) =>
    `bo/contracts/limited/v1/user/deactive/${userId}/${contractId}`,
  changeMobile: 'bo/contract/v1/limited/profile/change_mobile',

  // Batches
  batches: 'job/batches/limited/v1/list',
  createBatch: 'job/batches/limited/v1/contract/batch/add',
  runBatch: (id: number | string) => `job/batches/v1/executions/${id}/run/1`,
  pauseBatch: (id: number | string) => `job/batches/limited/v1/try-disable/${id}`,
  batchStatus: (id: number | string) => `job/batches/limited/v1/status/${id}`,
  batchSuccessItems: (id: number | string) => `job/batches/limited/v1/items/success/${id}`,
  batchErrorItems: (id: number | string) => `job/batches/limited/v1/items/errors/${id}`,

  // Attachments
  uploadAttachment: 'doc/bo/v1/upload/contract/org/attachment',
} as const;

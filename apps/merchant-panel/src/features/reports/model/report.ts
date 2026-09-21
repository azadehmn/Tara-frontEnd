export type ChargeDischargeType = 'charge' | 'discharge';

export type ChargeDischargeRow = {
  id: number;
  contractTitle: string;
  aggregatedAmountRial: number;
  aggregatedAmount: number;
  type: ChargeDischargeType;
};

export type UsersConsumeRow = {
  id: number;
  contractNumber: string;
  contractTitle: string;
  companyName: string;
  contractType: string;
  purchaseCount: number;
  consumeAmountRial: number;
};

export type AccountBalanceRow = {
  id: number;
  mobile: string;
  nationalCode: string;
  balanceRial: number;
};

export type SummaryReportRow = {
  id: number;
  merchantContractNumber: string;
  merchantContractTitle: string;
  purchaseCount: number;
  purchaseAmountRial: number;
};

export type PurchaseDetailRow = {
  id: number;
  trackingCode: string;
  referenceNumber: string;
  amountRial: number;
  dateTime: string;
  acceptorType: string;
  branchCode: string;
  acceptorTitle: string;
  gateway: string;
};

export type ReturnStatus = 'pending' | 'done' | 'rejected';

export type ReturnsReportRow = {
  id: number;
  userMobile: string;
  purchaseDate: string;
  storeTitle: string;
  returnDate: string;
  returnAmountRial: number;
  purchaseAmountRial: number;
  status: ReturnStatus;
  referenceNumber: string;
};

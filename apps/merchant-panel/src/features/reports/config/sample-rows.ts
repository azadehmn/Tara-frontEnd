import type {
  AccountBalanceRow,
  ChargeDischargeRow,
  PurchaseDetailRow,
  ReturnsReportRow,
  SummaryReportRow,
  UsersConsumeRow,
} from '../model/report';

export const chargeDischargeRows: ChargeDischargeRow[] = [];

export const usersConsumeRows: UsersConsumeRow[] = [
  {
    id: 1,
    contractNumber: '1134',
    contractTitle: 'قرارداد سازمانی رفاهی',
    companyName: 'شرکت نمونه پارس',
    contractType: 'Credit',
    purchaseCount: 186,
    consumeAmountRial: 95400000,
  },
  {
    id: 2,
    contractNumber: '2208',
    contractTitle: 'قرارداد اعتباری شعب',
    companyName: 'گروه صنعتی آریا',
    contractType: 'Cash',
    purchaseCount: 42,
    consumeAmountRial: 18600000,
  },
];

export const accountBalanceRows: AccountBalanceRow[] = [
  { id: 1, mobile: '09121234567', nationalCode: '0012345678', balanceRial: 3500000 },
  { id: 2, mobile: '09129876543', nationalCode: '0087654321', balanceRial: 12500000 },
  { id: 3, mobile: '09351230000', nationalCode: '0065432109', balanceRial: 0 },
];

export const summaryReportRows: SummaryReportRow[] = [
  {
    id: 1,
    merchantContractNumber: '88012',
    merchantContractTitle: 'قرارداد فروشندگی شعبه مرکزی',
    purchaseCount: 412,
    purchaseAmountRial: 186500000,
  },
  {
    id: 2,
    merchantContractNumber: '88045',
    merchantContractTitle: 'قرارداد فروشندگی فروشگاه آنلاین',
    purchaseCount: 97,
    purchaseAmountRial: 42800000,
  },
];

export const purchaseDetailRows: PurchaseDetailRow[] = [];

export const returnsReportRows: ReturnsReportRow[] = [
  {
    id: 1,
    userMobile: '09121234567',
    purchaseDate: '1404/06/12',
    storeTitle: 'فروشگاه مرکزی تارا',
    returnDate: '1404/06/14',
    returnAmountRial: 250000,
    purchaseAmountRial: 850000,
    status: 'done',
    referenceNumber: '99123456',
  },
  {
    id: 2,
    userMobile: '09351230000',
    purchaseDate: '1404/06/20',
    storeTitle: 'فروشگاه اینترنتی تارا',
    returnDate: '1404/06/22',
    returnAmountRial: 120000,
    purchaseAmountRial: 240000,
    status: 'pending',
    referenceNumber: '99123490',
  },
];

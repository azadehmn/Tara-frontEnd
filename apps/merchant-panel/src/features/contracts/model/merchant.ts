export interface ContractMerchantDto {
  id: number;
  merchantId: number;
  title: string;
  branchCode: string;
  accessibleType: string;
  contractId: number;
  contractTitle: string;
  cityName: string | null;
  cityId: number | null;
  provinceName: string | null;
  provinceId: number | null;
  visible: boolean;
  score: number | null;
  deactivated: boolean;
  disabled: boolean;
  level: string;
}

export interface ContractMerchant {
  id: number;
  title: string;
  branchCode: string;
  accessibleType: string;
  provinceName: string | null;
}

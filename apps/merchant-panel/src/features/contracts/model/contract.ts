export const ContractKind = {
  Credit: 'Credit',
  Acceptor: 'Acceptor',
  Cash: 'Cash',
  Organizational: 'Organizational',
} as const;

export type ContractKind = (typeof ContractKind)[keyof typeof ContractKind];

/** Numeric `type` values Club list filter expects. */
export const ClubContractTypeCode = {
  Credit: 0,
  Acceptor: 1,
  Cash: 2,
} as const;

export type ContractScope = 'organization' | 'acceptor';
export interface ContractListItemDto {
  id: number;
  profileTitle: string;
  endDate: string | null;
  title: string;
  type: string;
  disabled: boolean;
  isEnabled: boolean;
  deactivated: boolean;
}
export interface ContractTag {
  id: number;
  key: string;
  type: string;
  title: string;
  icon?: string;
  color?: string;
}

export interface ContractWallet {
  gradientAngle: number;
  gradientStart: string;
  gradientEnd: string;
  orgLogoUrl: string;
  textColor: string;
  accountTitle?: string;
}

export interface ContractListItem {
  id: number;
  title: string;
  profileTitle: string;
  type: string;
  endDate: string | null;
  isEnabled: boolean;
  deactivatedByOrg: boolean;
  disabledByTara: boolean;
}

export interface ContractDetail {
  id: number;
  title: string;
  profileTitle: string;
  type: string;
  number: string | null;
  iban: string | null;
  description: string | null;
  startDate: string | null;
  initDate: string | null;
  endDate: string | null;
  deactivatedByOrg: boolean;
  disabledByTara: boolean;
  tags: ContractTag[];
  wallet: ContractWallet | null;
}

export interface ContractListFilters {
  id?: string;
  title?: string;
  profileTitle?: string;
  fromDate?: string;
  toDate?: string;
}

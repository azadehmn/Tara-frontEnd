import type {
  ContractDetail,
  ContractListItem,
  ContractTag,
  ContractWallet,
  ContractListItemDto,
} from '../../model/contract';

export function mapContractListItem(raw: ContractListItemDto): ContractListItem {
  return {
    id: raw.id,
    title: raw.title,
    profileTitle: raw.profileTitle,
    type: raw.type,
    endDate: raw.endDate,
    isEnabled: raw.isEnabled,
    deactivatedByOrg: raw.deactivated,
    disabledByTara: raw.disabled,
  };
}

export function mapContractDetail(raw: unknown): ContractDetail {
  const row = asRecord(raw) ?? {};
  const tags = Array.isArray(row.tags) ? row.tags.map(mapContractTag) : [];
  const groupAccount = asRecord(row.groupAccount);

  return {
    id: Number(row.id ?? 0),
    title: String(row.title ?? ''),
    profileTitle: String(row.profileTitle ?? ''),
    type: String(row.type ?? ''),
    number: asOptionalString(row.number),
    iban: asOptionalString(row.iban),
    description: asOptionalString(row.description),
    startDate: asOptionalString(row.startDate),
    initDate: asOptionalString(row.initDate),
    endDate: asOptionalString(row.endDate),
    deactivatedByOrg: Boolean(row.deactivated),
    disabledByTara: Boolean(row.disabled),
    tags,
    wallet: mapWallet(row, groupAccount),
  };
}

function mapContractTag(raw: unknown): ContractTag {
  const row = asRecord(raw) ?? {};
  return {
    id: Number(row.id ?? 0),
    key: String(row.key ?? ''),
    type: String(row.type ?? ''),
    title: String(row.title ?? ''),
    icon: asOptionalString(row.icon) ?? undefined,
    color: asOptionalString(row.color) ?? undefined,
  };
}

function mapWallet(
  row: Record<string, unknown>,
  groupAccount?: Record<string, unknown>,
): ContractWallet | null {
  if (
    row.gradientStart == null &&
    row.gradientEnd == null &&
    row.orgLogoUrl == null &&
    row.textColor == null
  ) {
    return null;
  }

  return {
    gradientAngle: Number(row.gradientAngle ?? 0),
    gradientStart: String(row.gradientStart ?? ''),
    gradientEnd: String(row.gradientEnd ?? ''),
    orgLogoUrl: String(row.orgLogoUrl ?? ''),
    textColor: String(row.textColor ?? ''),
    accountTitle: asOptionalString(groupAccount?.title) ?? undefined,
  };
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function asOptionalString(value: unknown): string | null {
  if (value == null || value === '') return null;
  return String(value);
}

import type { CurrentUser } from '../../model/user';

export function mapCurrentUser(raw: unknown): CurrentUser {
  const root = asRecord(raw) ?? {};
  const data = asRecord(root.data) ?? root;

  const firstName = String(data.firstName ?? '');
  const lastName = String(data.lastName ?? '');
  const fullName = String(data.fullName ?? `${firstName} ${lastName}`.trim());

  return {
    id: String(data.id ?? data.userId ?? ''),
    username: String(data.username ?? ''),
    firstName,
    lastName,
    fullName,
    mobile: asOptionalString(data.mobile ?? data.cellNumber),
    avatar: asOptionalString(data.avatar ?? data.avatarUrl),
  };
}

function asOptionalString(value: unknown): string | null {
  if (value == null || value === '') return null;
  return String(value);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

import type { TrStatusType } from '@tara/ui';

const STATUS_TYPES: Record<string, TrStatusType> = {
  CLOSED: 'neutral',
  OPEN: 'positive',
  IN_PROGRESS: 'informative',
  PENDING: 'informative',
};

export function ticketStatusType(status: string): TrStatusType {
  return STATUS_TYPES[status] ?? 'neutral';
}

export function ticketStatusLabelKey(status: string): string {
  return `ticket.statuses.${status}`;
}

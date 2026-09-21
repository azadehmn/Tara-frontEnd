import type { TrStatusType } from '@tara/ui';
import { TicketStatus } from '../model/ticket';

const STATUS_TYPES: Record<TicketStatus, TrStatusType> = {
  [TicketStatus.NEW]: 'informative',
  [TicketStatus.IN_PROGRESS]: 'warning',
  [TicketStatus.SUPPORT_RESPONSE]: 'positive',
  [TicketStatus.CLOSED]: 'neutral',
};

export function ticketStatusType(status: TicketStatus): TrStatusType {
  return STATUS_TYPES[status];
}

export function ticketStatusLabelKey(status: TicketStatus): `ticket.statuses.${TicketStatus}` {
  return `ticket.statuses.${status}`;
}

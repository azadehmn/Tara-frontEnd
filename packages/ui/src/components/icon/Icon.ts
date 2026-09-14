import TrContractsIcon from '../../icons/ContractsIcon.vue';
import TrGridLayoutIcon from '../../icons/GridLayoutIcon.vue';
import TrInvoicesIcon from '../../icons/InvoicesIcon.vue';
import TrMenuIcon from '../../icons/MenuIcon.vue';
import TrReportsIcon from '../../icons/ReportsIcon.vue';
import TrTransactionIcon from '../../icons/TransactionIcon.vue';

export const icons = {
  contracts: TrContractsIcon,
  gridLayout: TrGridLayoutIcon,
  invoices: TrInvoicesIcon,
  menu: TrMenuIcon,
  reports: TrReportsIcon,
  transaction: TrTransactionIcon,
} as const;

export type TrIconName = keyof typeof icons;

export type TrIconSize = 'sm' | 'md' | 'lg';

export interface TrIconProps {
  name: TrIconName;
  size?: TrIconSize;
  label?: string;
}

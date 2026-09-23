export interface SummaryCardRow {
  label: string;
  value: string;
  currency?: boolean;
}

export interface SummaryCardProps {
  title: string;
  heroLabel: string;
  heroValue: string;
  rows: SummaryCardRow[];
}

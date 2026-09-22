import type { Component } from 'vue';
import type { TrLabelType } from '../label/Label';
import type { TrStatusType } from '../status/Status';

export type TrSummaryStatus = {
  type: TrStatusType;
  text?: string;
};

export type TrSummaryDivider = 'dashed' | 'solid' | 'none';

export type TrSummaryItem = {
  id: string | number;
  title: string;
  value?: string;
  /** Currency (or similar) chip next to the value. */
  valueLabel?: string;
  valueLabelType?: TrLabelType;
  description?: string;
  icon?: Component;
  valueIcon?: Component;
  itemClass?: string;
  status?: TrSummaryStatus;
};

export type TrSummaryProps = {
  items?: TrSummaryItem[];
  loading?: boolean;
  /** Line between title and value. Default `dashed`. */
  divider?: TrSummaryDivider;
};

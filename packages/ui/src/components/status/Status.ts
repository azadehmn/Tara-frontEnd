import type { Component } from 'vue';

export type TrStatusType =
  | 'neutral'
  | 'informative'
  | 'warning'
  | 'negative'
  | 'positive';

export type TrStatusProps = {
  type: TrStatusType;
  text?: string;
  dot?: boolean;
  icon?: Component;
  iconClass?: string;
};

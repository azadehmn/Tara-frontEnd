import type { Component } from 'vue';

export type TrInlineMessageType =
  | 'neutral'
  | 'informative'
  | 'warning'
  | 'negative'
  | 'positive';

export type TrInlineMessageProps = {
  type?: TrInlineMessageType;
  title?: string;
  description?: string;
  loading?: boolean;
  dismissible?: boolean;
  icon?: Component;
  dismissAriaLabel?: string;
};

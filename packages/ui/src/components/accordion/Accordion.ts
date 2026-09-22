import type { Component } from 'vue';

export type TrAccordionIconPosition = 'start' | 'end';

export type TrAccordionProps = {
  title: string;
  content?: string;
  iconPosition?: TrAccordionIconPosition;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: Component;
};

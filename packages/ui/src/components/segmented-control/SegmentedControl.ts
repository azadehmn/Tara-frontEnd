export type TrSegmentedControlValue = string | number;

export type TrSegmentedControlSize = 'small' | 'medium';

export type TrSegmentedControlOption = {
  value: TrSegmentedControlValue;
  label: string;
  disabled?: boolean;
};

export type TrSegmentedControlProps = {
  modelValue: TrSegmentedControlValue;
  options: TrSegmentedControlOption[];
  /** Accessible name for the option group. */
  label: string;
  size?: TrSegmentedControlSize;
  disabled?: boolean;
};

/**
 * Interactive color states for light and dark surfaces.
 * Hex values are sampled from tara360.ir (live CSS) and Brandfetch.
 */
export type TrColorState = {
  DEFAULT: string;
  disabled: string;
  focus: string;
  hover: string;
  pressed: string;
  select: string;
  loading: string;
};

export type TrPalette = TrColorState & {
  dark: TrColorState;
  text: {
    DEFAULT: string;
    dark: string;
  };
};

export type TrOutlinePalette = TrPalette & {
  border: {
    DEFAULT: string;
    hover: string;
    disabled: string;
    dark: {
      DEFAULT: string;
      hover: string;
      disabled: string;
    };
  };
};

export const color = {
  white: '#fff',
  primary: {
    DEFAULT: '#1423BA',

    dark: {
      DEFAULT: '#7380E8',
      disabled: '#343A63',
      focus: '#8792ED',
      hover: '#8E98EE',
      pressed: '#A7AFF2',
      select: '#7380E8',
      loading: '#8792ED',
    },

    disabled: '#C7CAF0',
    focus: '#3544CE',
    hover: '#2939C7',
    pressed: '#101C99',
    select: '#1423BA',
    loading: '#3544CE',

    text: {
      DEFAULT: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },
  secondary: {
    DEFAULT: '#B30A84',

    dark: {
      DEFAULT: '#E36AC2',
      disabled: '#5E3653',
      focus: '#EC83D1',
      hover: '#EA79CC',
      pressed: '#F09BDC',
      select: '#E36AC2',
      loading: '#EC83D1',
    },

    disabled: '#E6B4D8',
    focus: '#C92A9B',
    hover: '#C11B91',
    pressed: '#8E0868',
    select: '#B30A84',
    loading: '#C92A9B',

    text: {
      DEFAULT: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },
  outlined: {
    DEFAULT: '#FFFFFF',
    dark: {
      DEFAULT: '#0C051A',
      disabled: '#2A2438',
      focus: '#1A1230',
      hover: '#1A1230',
      pressed: '#24183C',
      select: '#1A1230',
      loading: '#1A1230',
    },
    disabled: '#EFEFF1',
    focus: '#FFFFFF',
    hover: '#F5F7FF',
    pressed: '#EBE4FF',
    select: '#F5F7FF',
    loading: '#F5F7FF',
    text: {
      DEFAULT: '#1423BA',
      dark: '#1423BA',
    },
    border: {
      DEFAULT: '#D3C3F4',
      hover: '#D3C3F4',
      disabled: '#D1D5DB',
      dark: {
        DEFAULT: '#D3C3F4',
        hover: '#D3C3F4',
        disabled: '#4A3A72',
      },
    },
  },
} as const satisfies {
  primary: TrPalette;
  secondary: TrPalette;
  outlined: TrOutlinePalette;
  white: string;
};

export type TrColorToken = typeof color;

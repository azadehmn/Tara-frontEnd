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
  surface: {
    DEFAULT: '#FFFFFF',
    hover: '#F7F7F8',
    focus: '#F4F4F5',
    pressed: '#EEEEF1',
    select: '#F4F4F5',
    disabled: '#EFEFF0',
    dark: {
      DEFAULT: '#19191A',
      hover: '#28282A',
      focus: '#28282A',
      pressed: '#39393C',
      select: '#323234',
      disabled: '#2B2B2C',
    },
  },
  text: {
    DEFAULT: '#2E2E38',
    soft: '#747481',
    disabled: '#8C8C8C',
    dark: {
      DEFAULT: '#FFFFFF',
      soft: '#BDBDBD',
      disabled: '#5E5E5E',
    },
  },
  border: {
    DEFAULT: '#DADBE1',
    soft: '#F4F4F6',
    divider: '#EEEEF1',
    dark: {
      DEFAULT: '#525252',
      soft: '#252525',
      divider: '#2E2E2E',
    },
  },
  skeleton: {
    DEFAULT: '#EDEEEF',
    dark: '#343536',
  },
  background: {
    DEFAULT: '#F5F5F5',
    dark: '#0F0F0F',
  },
} as const satisfies {
  primary: TrPalette;
  secondary: TrPalette;
  outlined: TrOutlinePalette;
  white: string;
  surface: {
    DEFAULT: string;
    hover: string;
    focus: string;
    pressed: string;
    select: string;
    disabled: string;
    dark: {
      DEFAULT: string;
      hover: string;
      focus: string;
      pressed: string;
      select: string;
      disabled: string;
    };
  };
  text: {
    DEFAULT: string;
    soft: string;
    disabled: string;
    dark: { DEFAULT: string; soft: string; disabled: string };
  };
  border: {
    DEFAULT: string;
    soft: string;
    divider: string;
    dark: { DEFAULT: string; soft: string; divider: string };
  };
  skeleton: { DEFAULT: string; dark: string };
  background: { DEFAULT: string; dark: string };
};

export type TrColorToken = typeof color;

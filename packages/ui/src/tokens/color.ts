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
    DEFAULT: '#1423BD',

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
    hover: '#192BE6',
    pressed: '#101C99',
    select: '#1423BD',
    loading: '#3544CE',

    text: {
      DEFAULT: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },
  chart: {
    current: '#1423BD',
    previous: '#4D74F7',
  },
  secondary: {
    DEFAULT: '#F0F7FF',

    dark: {
      DEFAULT: '#1E2A40',
      disabled: '#252A33',
      focus: '#253550',
      hover: '#2C4568',
      pressed: '#35547A',
      select: '#1E2A40',
      loading: '#1A2230',
    },

    disabled: '#E8ECF2',
    focus: '#D6ECFF',
    hover: '#CCE5FF',
    pressed: '#B8D9FF',
    select: '#F0F7FF',
    loading: '#FAFCFF',

    text: {
      DEFAULT: '#004FA3',
      dark: '#A7AFF2',
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
      DEFAULT: '#1423BD',
      dark: '#1423BD',
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
    success: '#E0FFF5',
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
    information: '#006BC9',
    warning: '#9C6300',
    success: '#248061',
    danger: '#C93637',
    dark: {
      DEFAULT: '#FFFFFF',
      soft: '#BDBDBD',
      disabled: '#5E5E5E',
      information: '#33A0FF',
      warning: '#FFB333',
      success: '#00CC88',
      danger: '#FF5C5D',
    },
  },
  icon: {
    disabled: '#8C8C8C',
    information: '#006BC9',
    warning: '#9C6300',
    danger: '#C93637',
    success: '#248061',
    dark: {
      disabled: '#5E5E5E',
      information: '#33A0FF',
      warning: '#FFB333',
      danger: '#FF5C5D',
      success: '#00CC88',
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
    dark: '#101828',
  },
} as const satisfies {
  primary: TrPalette;
  secondary: TrPalette;
  outlined: TrOutlinePalette;
  white: string;
  chart: {
    current: string;
    previous: string;
  };
  surface: {
    DEFAULT: string;
    hover: string;
    focus: string;
    pressed: string;
    select: string;
    disabled: string;
    success: string;
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
    information: string;
    warning: string;
    success: string;
    danger: string;
    dark: {
      DEFAULT: string;
      soft: string;
      disabled: string;
      information: string;
      warning: string;
      success: string;
      danger: string;
    };
  };
  icon: {
    disabled: string;
    information: string;
    warning: string;
    success: string;
    danger: string;
    dark: {
      disabled: string;
      information: string;
      warning: string;
      success: string;
      danger: string;
    };
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

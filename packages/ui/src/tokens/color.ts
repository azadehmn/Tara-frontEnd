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

/**
 * Brand palette used by TrButton and later components.
 *
 * primary   filled purple  — «دانلود تارا» (#5825C5)
 * secondary filled magenta — «دانلود اپلیکیشن» (#ED0CA8)
 * outlined  border button  — «شروع همکاری»
 */
export const color = {
  white:'#fff',
  primary: {
    DEFAULT: '#5825C5',
    dark: {
      DEFAULT: '#7C5CFF',
      disabled: '#4A3A72',
      focus: '#9580FF',
      hover: '#9580FF',
      pressed: '#5825C5',
      select: '#9580FF',
      loading: '#6B52D6',
    },
    disabled: '#C4B5E8',
    focus: '#6E3DD6',
    hover: '#6E3DD6',
    pressed: '#451D9A',
    select: '#451D9A',
    loading: '#6E3DD6',
    text: {
      DEFAULT: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },
  secondary: {
    DEFAULT: '#ED0CA8',
    dark: {
      DEFAULT: '#FF4DCC',
      disabled: '#6B2A55',
      focus: '#FF6AD4',
      hover: '#FF6AD4',
      pressed: '#B80E80',
      select: '#B80E80',
      loading: '#D14AA8',
    },
    disabled: '#F5A8D8',
    focus: '#F53BC0',
    hover: '#F53BC0',
    pressed: '#B80E80',
    select: '#B80E80',
    loading: '#F53BC0',
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
      DEFAULT: '#fff',
      dark: '#fff',
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

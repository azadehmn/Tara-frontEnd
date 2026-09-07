export type TrTypeStyle = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
};

export type TrResponsiveType = {
  mobile: TrTypeStyle;
  desktop: TrTypeStyle;
};

/**
 * Type scale. Prefer semantic keys (heading / body / caption / display / button)
 * over legacy names like b1 or ls-h1.
 */
export const typography = {
  heading: {
    sm: { fontSize: '16px', lineHeight: '24px', fontWeight: '600' },
    md: { fontSize: '18px', lineHeight: '28px', fontWeight: '600' },
    lg: { fontSize: '20px', lineHeight: '32px', fontWeight: '600' },
  },
  body: {
    sm: { fontSize: '12px', lineHeight: '20px', fontWeight: '400' },
    md: { fontSize: '14px', lineHeight: '24px', fontWeight: '400' },
    lg: { fontSize: '18px', lineHeight: '32px', fontWeight: '400' },
    smMedium: { fontSize: '12px', lineHeight: '20px', fontWeight: '500' },
    mdMedium: { fontSize: '14px', lineHeight: '24px', fontWeight: '500' },
    lgMedium: { fontSize: '18px', lineHeight: '32px', fontWeight: '500' },
  },
  caption: {
    regular: { fontSize: '12px', lineHeight: '12px', fontWeight: '400' },
    medium: { fontSize: '12px', lineHeight: '12px', fontWeight: '500' },
  },
  button: {
    sm: { fontSize: '12px', lineHeight: '20px', fontWeight: '600' },
    md: { fontSize: '14px', lineHeight: '24px', fontWeight: '600' },
    lg: { fontSize: '16px', lineHeight: '24px', fontWeight: '600' },
  },
  display: {
    sm: {
      mobile: { fontSize: '28px', lineHeight: '40px', fontWeight: '600' },
      desktop: { fontSize: '28px', lineHeight: '40px', fontWeight: '600' },
    },
    md: {
      mobile: { fontSize: '32px', lineHeight: '44px', fontWeight: '600' },
      desktop: { fontSize: '32px', lineHeight: '52px', fontWeight: '600' },
    },
    lg: {
      mobile: { fontSize: '36px', lineHeight: '56px', fontWeight: '600' },
      desktop: { fontSize: '44px', lineHeight: '64px', fontWeight: '600' },
    },
    xl: {
      mobile: { fontSize: '44px', lineHeight: '84px', fontWeight: '600' },
      desktop: { fontSize: '56px', lineHeight: '84px', fontWeight: '600' },
    },
  },
} as const satisfies {
  heading: Record<string, TrTypeStyle>;
  body: Record<string, TrTypeStyle>;
  caption: Record<string, TrTypeStyle>;
  button: Record<string, TrTypeStyle>;
  display: Record<string, TrResponsiveType>;
};

export type TrTypographyToken = typeof typography;

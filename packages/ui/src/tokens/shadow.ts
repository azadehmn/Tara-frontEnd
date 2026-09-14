export const shadow = {
  elevation50: '0px 1px 4px rgba(0, 0, 0, 0.05)',
  elevation100: '0px 4px 8px 2px rgba(96, 96, 108, 0.1)',
  elevation200: '0px 4px 16px rgba(96, 96, 108, 0.2)',
  dark: {
    elevation50: '0px 1px 4px rgba(0, 0, 0, 0.4)',
    elevation100: '0px 4px 8px -2px rgba(0, 0, 0, 0.6)',
    elevation200: '0px 4px 15px rgba(0, 0, 0, 0.6)',
  },
} as const;

export type TrShadowToken = typeof shadow;

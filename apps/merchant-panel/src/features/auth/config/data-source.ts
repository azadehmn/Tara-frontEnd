export const AUTH_ME_USE_MOCK = import.meta.env.PROD
  ? import.meta.env.VITE_AUTH_ME_USE_MOCK === 'true'
  : import.meta.env.VITE_AUTH_ME_USE_MOCK !== 'false';

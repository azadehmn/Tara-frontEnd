export const authEndpoints = {
  loginBackoffice: 'auth/user/panel/v1/login/backoffice',
  userAuthorities: (userId: number | string) => `auth/user/authority/v1/authorities/${userId}`,
} as const;

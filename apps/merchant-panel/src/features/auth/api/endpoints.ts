export const authEndpoints = {
  loginBackoffice: 'auth/user/panel/v1/login/backoffice',
  loginVerify: 'auth/user/v1/login/verify',
  me: 'auth/user/v1/me',
  userAuthorities: (userId: number | string) => `auth/user/authority/v1/authorities/${userId}`,
} as const;

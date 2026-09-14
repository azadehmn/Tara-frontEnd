import { getAccessToken } from '@shared/auth/token-storage';
import type { RequestInterceptor } from '../types';

export const applyAuthHeader: RequestInterceptor = ({ headers }) => {
  const token = getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
};

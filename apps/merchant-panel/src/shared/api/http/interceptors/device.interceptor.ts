import type { RequestInterceptor } from '../types';

export function applyDeviceHeader(deviceType: string): RequestInterceptor {
  return ({ headers }) => {
    if (!headers.has('user_agent')) {
      headers.set('user_agent', deviceType);
    }
  };
}

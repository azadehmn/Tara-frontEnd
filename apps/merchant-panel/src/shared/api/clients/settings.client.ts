import { API_BASE_PATHS, PANEL_DEVICE_TYPE, getApiOrigin } from '@app/config/api';
import { createHttpClient } from '../http/create-http-client';
import { applyDeviceHeader } from '../http/interceptors/device.interceptor';

export const settingsClient = createHttpClient({
  service: 'settings',
  origin: getApiOrigin(),
  basePath: API_BASE_PATHS.settings,
  requestInterceptors: [applyDeviceHeader(PANEL_DEVICE_TYPE)],
});

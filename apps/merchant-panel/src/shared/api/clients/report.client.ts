import { API_BASE_PATHS, PANEL_DEVICE_TYPE, getApiOrigin } from '@app/config/api';
import { createHttpClient } from '../http/create-http-client';
import { applyDeviceHeader } from '../http/interceptors/device.interceptor';

export const reportClient = createHttpClient({
  service: 'report',
  origin: getApiOrigin(),
  basePath: API_BASE_PATHS.report,
  requestInterceptors: [applyDeviceHeader(PANEL_DEVICE_TYPE)],
});

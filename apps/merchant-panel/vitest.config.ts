import { mergeConfig } from 'vite';
import { sharedVitestConfig } from '@tara/testing/vitest';
import { createMerchantViteConfig } from './vite.config';

export default mergeConfig(createMerchantViteConfig('test'), sharedVitestConfig);

import { mergeConfig } from 'vite';
import { sharedVitestConfig } from '@tara/testing/vitest';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, sharedVitestConfig);

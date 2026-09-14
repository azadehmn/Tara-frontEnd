import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv, type ProxyOptions, type UserConfig } from 'vite';

export function createMerchantViteConfig(mode: string): UserConfig {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_');
  const apiOrigin = env.VITE_API_BASE_URL || 'https://stage.tara-club.ir';
  const docsOrigin = env.VITE_DOC_ORIGIN || 'https://bo.tara360.ir';

  const gatewayProxy: ProxyOptions = {
    target: apiOrigin,
    changeOrigin: true,
    secure: true,
  };

  return {
    plugins: [
      vue(),
      tailwindcss(),
      AutoImport({
        imports: [{ 'vue-i18n': ['useI18n'] }],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/club': gatewayProxy,
        '/bnpl': gatewayProxy,
        '/settings': gatewayProxy,
        '/dreport': gatewayProxy,
        '/tara-docs': {
          target: docsOrigin,
          changeOrigin: true,
          secure: true,
          // /tara-docs is prefix dev
          rewrite: (path) => path.replace(/^\/tara-docs/, ''),
        },
      },
    },
    optimizeDeps: {
      // Pre-bundle the external dependency for faster development startup.
      include: ['vue-i18n'],
      // Keep the workspace package as source for local development and HMR.
      exclude: ['@tara/locale'],
    },
  };
}

export default defineConfig(({ mode }) => createMerchantViteConfig(mode));

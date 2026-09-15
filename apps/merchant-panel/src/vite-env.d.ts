/// <reference types="vite/client" />
/// <reference path="./auto-imports.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DOC_ORIGIN?: string;
  readonly VITE_DEV_ACCESS_TOKEN?: string;
  readonly VITE_INCOME_CHART_USE_MOCK?: string;
  readonly VITE_SUMMARY_USE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vue-router' {
  interface RouteMeta {
    titleKey?: string;
  }
}

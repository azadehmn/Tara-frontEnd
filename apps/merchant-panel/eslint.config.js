import taraVue from '@tara/eslint-config/vue';

export default [
  {
    ignores: ['dist', 'coverage', 'node_modules', 'src/auto-imports.d.ts', 'src/vite-env.d.ts'],
  },
  ...taraVue,
  {
    languageOptions: {
      globals: {
        useI18n: 'readonly',
      },
    },
  },
];

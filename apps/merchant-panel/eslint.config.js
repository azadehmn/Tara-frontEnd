import taraVue from '@tara/eslint-config/vue';

export default [
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },
  ...taraVue,
];

import type { App, Plugin } from 'vue';
import { TrButton } from './components/button';
import { TrNavigationBar } from './components/NavigationBar';
import { TrTopBar } from './components/TopBar';

/**
 * Registers kit components for templates as Tr-* (Tr-Button, Tr-TopBar).
 * JS imports stay camel-case: `import { TrButton } from '@tara/ui'`.
 */
export const taraUi: Plugin = {
  install(app: App) {
    app.component('Tr-Button', TrButton);
    app.component('Tr-NavigationBar', TrNavigationBar);
    app.component('Tr-TopBar', TrTopBar);
  },
};

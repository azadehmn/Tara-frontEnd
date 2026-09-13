import type { App, Plugin } from 'vue';
import { TrAction } from './components/action';
import { TrButton } from './components/button';
import { TrCard } from './components/card';
import { TrNavigationBar } from './components/NavigationBar';
import { TrTable } from './components/table';
import { TrTopBar } from './components/TopBar';

/**
 * Registers kit components for templates as Tr-* (Tr-Button, Tr-TopBar).
 * JS imports stay camel-case: `import { TrButton } from '@tara/ui'`.
 */
export const taraUi: Plugin = {
  install(app: App) {
    app.component('Tr-Action', TrAction);
    app.component('Tr-Button', TrButton);
    app.component('Tr-Card', TrCard);
    app.component('Tr-NavigationBar', TrNavigationBar);
    app.component('Tr-Table', TrTable);
    app.component('Tr-TopBar', TrTopBar);
  },
};

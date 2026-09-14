import type { App, Plugin } from 'vue';
import { TrAction } from './components/action';
import { TrButton } from './components/button';
import { TrCard } from './components/card';
import { TrIcon } from './components/icon';
import { TrNavigationBar } from './components/NavigationBar';
import { TrTable } from './components/table';
import { TrTopBar } from './components/TopBar';

/**
 * Registers kit components for templates as TrButton, TrTopBar, etc.
 * JS imports stay the same: `import { TrButton } from '@tara/ui'`.
 */
export const taraUi: Plugin = {
  install(app: App) {
    app.component('TrAction', TrAction);
    app.component('TrButton', TrButton);
    app.component('TrIcon', TrIcon);
    app.component('TrCard', TrCard);
    app.component('TrNavigationBar', TrNavigationBar);
    app.component('TrTable', TrTable);
    app.component('TrTopBar', TrTopBar);
  },
};

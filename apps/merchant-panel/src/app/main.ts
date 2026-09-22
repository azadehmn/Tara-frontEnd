import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { createLocale } from '@tara/locale';
import { taraUi } from '@tara/ui';

import App from './App.vue';
import { router } from './router';
import { installAppBack } from '@shared/lib/use-app-back';

import '@assets/styles.css';
import 'driver.js/dist/driver.css';
import '@features/onboarding/ui/tour.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(installAppBack(router));
app.use(taraUi);

// Loads merchant-panel + common dictionaries from @tara/locale.
app.use(
  createLocale({
    app: 'merchant-panel',
    locale: 'fa',
  }),
);

app.mount('#app');

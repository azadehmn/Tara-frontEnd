import type { App, Plugin } from 'vue';
import { TrAction } from './components/action';
import { TrAvatar } from './components/avatar';
import { TrButton } from './components/button';
import { TrCard } from './components/card';
import { TrIcon } from './components/icon';
import { TrLabel } from './components/label';
import { TrNavigationBar } from './components/NavigationBar';
import { TrSegmentedControl } from './components/segmented-control';
import { TrStatus } from './components/status';
import { TrTable, TrTableCard } from './components/table';
import { TrTextField } from './components/text-field';
import { TrTextarea } from './components/textarea';
import { TrTopBar } from './components/TopBar';
import { TrTooltip } from './components/tooltip';
import { TrOtpField } from './components/otp-field';
import { TrEmptyState } from './components/empty-state';
import { TrInlineMessage } from './components/inline-message';
import { TrPageHeading } from './components/page-heading';
import { TrAccordion } from './components/accordion';
import { TrNavLink } from './components/nav-link';
import { TrModal } from './components/modal';
import { TrSummary } from './components/summary';
import { TrTab } from './components/tab';

/**
 * Registers kit components for templates as TrButton, TrTopBar, etc.
 * JS imports stay the same: `import { TrButton } from '@tara/ui'`.
 */
export const taraUi: Plugin = {
  install(app: App) {
    app.component('TrAction', TrAction);
    app.component('TrAvatar', TrAvatar);
    app.component('TrButton', TrButton);
    app.component('TrIcon', TrIcon);
    app.component('TrCard', TrCard);
    app.component('TrLabel', TrLabel);
    app.component('TrNavigationBar', TrNavigationBar);
    app.component('TrSegmentedControl', TrSegmentedControl);
    app.component('TrStatus', TrStatus);
    app.component('TrTable', TrTable);
    app.component('TrTableCard', TrTableCard);
    app.component('TrTextField', TrTextField);
    app.component('TrTextarea', TrTextarea);
    app.component('TrOtpField', TrOtpField);
    app.component('TrEmptyState', TrEmptyState);
    app.component('TrInlineMessage', TrInlineMessage);
    app.component('TrPageHeading', TrPageHeading);
    app.component('TrAccordion', TrAccordion);
    app.component('TrNavLink', TrNavLink);
    app.component('TrModal', TrModal);
    app.component('TrSummary', TrSummary);
    app.component('TrTab', TrTab);
    app.component('TrTopBar', TrTopBar);
    app.component('TrTooltip', TrTooltip);
  },
};

# Tara frontend

Monorepo for Tara Vue apps. Right now the app that runs is **merchant panel**.

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

Same as `pnpm --filter @tara/merchant-panel dev`. Vite prints the local URL (usually `http://localhost:5173`).

Copy env from the example if you don’t have one:

```bash
cp apps/merchant-panel/.env.example apps/merchant-panel/.env.development
```

`VITE_API_BASE_URL` is the Club/stage host. Dev requests go through the Vite proxy. `VITE_DEV_ACCESS_TOKEN` is optional (local only — don’t commit a real token).

## Test / lint / build

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

Merchant panel tests: Vitest. Locale package has its own tests too (`pnpm test` runs both).

Watch mode for the panel:

```bash
pnpm --filter @tara/merchant-panel test:watch
```

## Repo layout

```
apps/merchant-panel   # Vue app
packages/ui           # Tara UI kit (Button, Card, Table, …)
packages/locale       # vue-i18n dictionaries (fa / en)
packages/eslint-config
packages/tsconfig
packages/testing
```

Apps import packages with workspace names, e.g. `@tara/ui`, `@tara/locale`.

## Merchant panel

**Stack:** Vue 3, TypeScript, Vite, Vue Router, Pinia, vue-i18n, Tailwind v4.

The app is **feature-based**, not a giant `components/` dump.
Business logic is kept inside each feature. Common app-level code stays in `shared`.
Reusable UI components and design tokens are maintained in `@tara/ui`, and shared translations are handled by `@tara/locale`.

| Folder                | What goes here                                                    |
| --------------------- | ----------------------------------------------------------------- |
| `src/app`             | bootstrap, router, layouts, sidebar                               |
| `src/pages`           | route-level pages (thin; they wire a feature)                     |
| `src/features/<name>` | one product area: `api`, `model`, `composables`, `ui`             |
| `src/shared`          | HTTP client, errors, auth storage — used by more than one feature |

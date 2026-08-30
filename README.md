# @doscientos/configs

Fast, strict, framework-aware engineering standards for Doscientos projects.

## Installation

Install only the peers required by the selected profile. Oxlint and Oxfmt run
natively; no JavaScript ESLint plugins are required.

## Oxlint profiles

- `@doscientos/configs/oxlint/base`: language-agnostic correctness, safety and
  import-cycle rules.
- `@doscientos/configs/oxlint/typescript`: strict TypeScript rules suitable for
  applications that validate external data at their boundaries.
- `@doscientos/configs/oxlint/typescript-strict`: adds `no-unsafe-*` rules for
  fully typed domain libraries.
- `@doscientos/configs/oxlint/react-vite`: React, hooks and accessibility rules.
- `@doscientos/configs/oxlint/node`: server and script profile; permits logging.
- `@doscientos/configs/architecture`: feature-layer import boundaries.

Compose profiles in `oxlint.config.ts`. Keep exceptions local and documented;
do not lower a shared rule to silence one application.

## Formatting

Use `@doscientos/configs/oxfmt` as the shared Oxfmt policy. It enforces a
deterministic import order, 100-column line width, semicolons, single quotes and
Tailwind utility ordering while excluding generated artifacts.

## Structure and naming

Run `doscientos-structure --root src`. The checker enforces:

- top-level source areas: `app`, `features`, `pages`, `shared`;
- kebab-case directories and source files;
- `*.test.*`, `*.spec.*` and `*.stories.*` suffixes;
- only `App.tsx`, `main.tsx` and `vite-env.d.ts` as source-root file exceptions.

Use Oxlint's feature-layer profile for dependency direction. The structure
checker deliberately does not parse imports, keeping it fast and deterministic.

## Vitest

`createVitestConfig` provides isolated tests, reset mocks, V8 coverage and
thresholds of 80% for statements/functions/lines and 75% for branches. Enable
coverage in CI with `vitest run --coverage`; pass narrower `coverage.include`
patterns for executable business code rather than measuring generated entrypoints.

## TypeScript

Extend `@doscientos/configs/tsconfig/base` then set module resolution, JSX and
paths per runtime. The base enables strict mode, override declarations,
isolated modules and consistent casing. Domain packages with fully migrated
optional values should extend `@doscientos/configs/tsconfig/strict` to add
exact optional properties and unchecked-index protection.

## Publishing

Run `npm pack --dry-run` and `npm run check` before publishing. The package is
configured for public scoped publication with the MIT license.

Every regular commit to `main` publishes the next patch version and creates its
tag automatically. To publish a minor or major, edit the `version` in
`package.json` before pushing; the workflow publishes that exact version and
continues patch releases from it. Configure npm Trusted Publishing for
`doscientos-es/configs`, workflow
`.github/workflows/publish.yml`, and GitHub environment `npm-production`; no
registry token is stored in the repository.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Project-specific guidance

## Architecture

- **`backend/`**: NestJS 11 app, Express platform, serves under `/api` prefix on port 3000
- **`frontend/`**: Angular 22 app, **NgModule-based** (not standalone components). Proxies `/api` to backend (see `frontend/proxy.conf.json`)
- **`shared-types/`**: CJS library (esbuild). Import as `@meu-cha-de-casa-nova/shared-types`
- **`frontend-e2e/`**: Playwright e2e tests across chromium/firefox/webkit
- **`backend-e2e/`**: Jest e2e tests (depends on `backend:build` + `backend:serve`)

`nx serve frontend` automatically starts the backend too. The dev server uses `@angular/build:dev-server` with proxy config.

## Testing

| Project | Framework | Run command |
|---------|-----------|-------------|
| `frontend` | Vitest | `npm exec nx test frontend` |
| `backend` | Jest | `npm exec nx test backend` |
| `shared-types` | Jest | `npm exec nx test shared-types` |
| `frontend-e2e` | Playwright | `npm exec nx e2e frontend-e2e` |
| `backend-e2e` | Jest | `npm exec nx e2e backend-e2e` |

## Conventions

- **Style**: CSS (not Sass/SCSS). Prettier with `singleQuote: true` and `.prettierignore` excludes `dist`, `coverage`, `.nx/cache`, `.angular`
- **ESLint**: `@nx/enforce-module-boundaries` enforces buildable lib dependency rules
- **Default branch**: `master` (set in `nx.json`)
- **Angular strict mode**: enabled in `frontend/tsconfig.json` (strict templates, strict inputs, etc.)
- **Nx Cloud**: analytics enabled, remote caching configured

## Path aliases (tsconfig.base.json)

```
@meu-cha-de-casa-nova/shared-types -> ./shared-types/src/index.ts
```

## OpenSpec

There is a change in progress under `openspec/changes/adicionar-item/`. Use the `openspec-*` skills to interact with the OpenSpec workflow.

## Known quirks

- `tsconfig.base.json` has a stale path alias `@meu-cha-de-casa-nova/shared=types` (with equals sign) alongside the correct `shared-types` — prefer the latter
- **Always rebuild after shared-types changes**: `npm exec nx build shared-types` before using the built output in other projects
- `backend` build uses webpack (`@nx/webpack/app-plugin`), not esbuild or tsc
- `frontend` tests use Vitest (tsconfig.spec.json references `vitest/globals`), while every other project uses Jest

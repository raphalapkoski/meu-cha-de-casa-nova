## Context

Monorepo Nx com duas aplicações: frontend Angular 22 (build via @angular/build:application, output em dist/frontend/browser) e backend NestJS 11 (build via webpack, output em dist/backend). Atualmente a aplicação só roda localmente com `nx serve frontend` (que inicia ambos os apps).

O Vercel tem suporte nativo a monorepos Nx através do `@vercel/nx` preset, que detecta automaticamente a estrutura e os targets de build.

## Goals / Non-Goals

**Goals:**
- Frontend Angular servido como static files no Vercel
- Backend NestJS deployado como serverless function (API routes)
- Build automatizado via Vercel Git integration (push na master)
- Variáveis de ambiente configuradas no dashboard do Vercel
- Roteamento: `/api/*` → backend, `/*` → frontend (SPA fallback)

**Non-Goals:**
- CI/CD fora do Vercel (GitHub Actions, etc.)
- Multi-ambiente (staging, preview) — coverage inicial
- Banco de dados gerenciado pelo Vercel (já temos PostgreSQL externo via TypeORM)

## Decisions

1. **vercel.json na raiz** — Usar um único arquivo de configuração na raiz do monorepo definindo `buildCommand`, `outputDirectory`, `rewrites` (para rotear `/api/*` ao backend) e `regions`. Isso mantém a configuração versionada e visível.

2. **Root `buildCommand` com Nx** — Usar `npx nx build frontend --prod && npx nx build backend --prod` para buildar ambos os apps. O Vercel usará o output combinado: frontend como static files e backend serverless function.

3. **Serverless function para backend** — O NestJS será empacotado como uma serverless function usando o adapter `@nestjs/platform-express` no handler do Vercel. Um arquivo `api/index.js` (ou `api/serverless.js`) na raiz servirá como entrypoint.

4. **SPA fallback** — Configurar `rewrites` no vercel.json para que todas as rotas não-API sirvam o `index.html` do frontend (single-page application).

5. **Variáveis de ambiente** — Gerenciadas via Vercel Dashboard (DATABASE_URL, etc.). O .env.example serve como referência.

6. **Shared-types** — O Nx gerencia a dependência: `frontend` e `backend` dependem de `^build` que builda shared-types primeiro.

## Risks / Trade-offs

- **Cold start latency** — Backend como serverless function pode ter ~1s de cold start. Mitigação: usar `regions` próximas ao banco, considerar keep-alive se latência for crítica.
- **Serverless timeout** — Vercel serverless functions têm limite de 10s para Hobby/60s para Pro. O backend NestJS com TypeORM pode exceder em cold starts. Mitigação: conectar ao banco lazy, evitar conexões desnecessárias no bootstrap.
- **Webpack vs Vercel** — O backend usa webpack config customizado. Vercel pode precisar de configuração extra para funcionar com esse setup. Alternativa: migrar para esbuild (mais compatível com serverless).
- **File uploads** — Upload de imagens (base64 no POST /api/items) pode exceder limite de body em serverless (4.5MB Vercel). Mitigação: já usamos base64, mas precisamos validar tamanho.

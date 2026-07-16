## Why

O projeto é uma aplicação full-stack (Angular 22 + NestJS 11) em monorepo Nx que atualmente só roda localmente. Não há deployment configurado. Precisamos fazer o deploy no Vercel para disponibilizar a aplicação publicamente, aproveitando o suporte nativo do Vercel para monorepos Nx.

## What Changes

- Adicionar `vercel.json` na raiz do monorepo com configuração de build e rotas
- Configurar `vc.json` (ou settings equivalentes via Verceli dashboard) para cada app
- Ajustar o build do backend para output compatível com serverless functions do Vercel
- Garantir que variáveis de ambiente (DATABASE_URL, etc.) estejam configuradas no Vercel
- Criar script de build combinado para deploy (build de shared-types + backend + frontend)

## Capabilities

### New Capabilities
- `deploy-vercel`: Configuração de deploy no Vercel para o monorepo Nx com Angular frontend e NestJS backend

### Modified Capabilities

<!-- No existing specs are being modified; this is a new infrastructure concern -->

## Impact

- **frontend**: Build output (dist/frontend/browser) servido como static files no Vercel
- **backend**: Build output (dist/backend) adaptado para serverless functions
- **shared-types**: Deve ser buildado antes dos apps no pipeline de CI/CD
- **Infra**: Variáveis de ambiente (.env.production) sincronizadas com Vercel
- **CI**: Pipeline de deploy automatizado no Vercel triggered por push na branch master

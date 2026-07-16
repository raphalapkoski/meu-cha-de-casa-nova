## 1. Configuração do Vercel

- [x] 1.1 Criar `vercel.json` na raiz com build command, output directory e rewrites
- [x] 1.2 Criar arquivo `api/index.js` como entrypoint serverless do backend NestJS
- [x] 1.3 Adicionar `@vercel/nx` como dependência de dev (ou configurar preset no Vercel)
- [ ] 1.4 Configurar variáveis de ambiente (DATABASE_URL, NODE_ENV) no Vercel Dashboard

## 2. Ajustes no Backend

- [x] 2.1 Adaptar bootstrap do NestJS para modo serverless (reutilizar conexão entre chamadas)
- [x] 2.2 Configurar webpack para output compatível com serverless function do Vercel
- [x] 2.3 Verificar se shared-types é resolvido corretamente no build do backend

## 3. Ajustes no Frontend

- [x] 3.1 Verificar build de produção do frontend (output em dist/frontend/browser)
- [x] 3.2 Configurar SPA fallback no vercel.json (rewrite /* para /index.html)
- [x] 3.3 Ajustar proxy config para ambiente de produção (remover proxy local)

## 4. Deploy e Verificação

- [ ] 4.1 Conectar repositório ao Vercel via Git integration
- [ ] 4.2 Executar primeiro deploy e verificar build bem-sucedido
- [ ] 4.3 Testar rotas de API (/api/items) no ambiente de produção
- [ ] 4.4 Testar navegação SPA (rotas do frontend)
- [ ] 4.5 Verificar conexão com banco de dados PostgreSQL

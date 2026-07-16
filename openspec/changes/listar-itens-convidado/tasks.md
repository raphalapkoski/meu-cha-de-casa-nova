## 1. Backend — Módulo Convidado

- [ ] 1.1 Criar `ConvidadoController` com endpoint `GET /api/convidado/items`
- [ ] 1.2 Criar `ConvidadoService` que injeta `ItemsRepository` e retorna todos os itens
- [ ] 1.3 Criar `ConvidadoModule` com imports necessários e registrar no `AppModule`
- [ ] 1.4 Escrever testes de integração do controller (Jest + supertest): retorno 200 com lista de itens e 200 com lista vazia

## 2. Frontend — Módulo Convidado

- [ ] 2.1 Criar `ConvidadoState` (signal-based, providers na página) com `items`, `loading` e método `load()`
- [ ] 2.2 Criar `ItemConvidadoList` componente standalone com `@for` exibindo imagem + nome (sem ações)
- [ ] 2.3 Criar `ConvidadoPage` (standalone, lazy-loaded) com providers do estado e template com estados loading/empty/list
- [ ] 2.4 Adicionar rota `/convidado` em `app.routes.ts` (lazy-load `ConvidadoPage`)
- [ ] 2.5 Escrever testes do `ConvidadoState` (Vitest) — loading, dados carregados, lista vazia
- [ ] 2.6 Escrever testes do `ItemConvidadoList` (Vitest) — renderização com dados, estado vazio

## 1. Backend

- [x] 1.1 Adicionar método `updateStatus` em `ItemsRepository`
- [x] 1.2 Adicionar método `marcarCompra` em `ItemsService` com validações
- [x] 1.3 Criar endpoint `PATCH /api/items/:id/marcar-compra` em `ItemsController`
- [x] 1.4 Escrever testes do controller (200, 404, 400) com supertest
- [x] 1.5 Escrever testes do service (sucesso, item não encontrado, já comprado)

## 2. Frontend — Serviço e Estado

- [x] 2.1 Adicionar método `marcarCompra(id)` em `ConvidadoItemsService`
- [x] 2.2 Adicionar método e sinal `marcarCompra` + `marcando` em `ConvidadoState`
- [x] 2.3 Escrever testes do `ConvidadoState.marcarCompra`

## 3. Frontend — Componente e UI

- [x] 3.1 Adicionar botão "Oba, comprei este!" em `item-convidado-list`
- [x] 3.2 Configurar `hlm-dialog` de confirmação com mensagem e botões Sim/Não
- [x] 3.3 Integrar chamada ao `ConvidadoState` e feedback de loading
- [x] 3.4 Instalar `canvas-confetti` e adicionar animação de fogos no sucesso
- [x] 3.5 Escrever testes do componente `item-convidado-list`

## 4. Integração e Verificação

- [x] 4.1 Build do backend (`npm exec nx build backend`)
- [x] 4.2 Build do frontend (`npm exec nx build frontend`)
- [x] 4.3 Executar testes do backend (`npm exec nx test backend`)
- [x] 4.4 Executar testes do frontend (`npm exec nx test frontend`)
- [x] 4.5 Build do shared-types se necessário (`npm exec nx build shared-types`)

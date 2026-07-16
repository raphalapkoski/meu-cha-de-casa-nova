## Why

Atualmente não é possível remover itens da lista de presentes no módulo de gestão. O anfitrião precisa de uma forma de deletar itens cadastrados por engano ou que não deseja mais incluir.

## What Changes

- Adicionar endpoint `DELETE /api/items/:id` no backend
- Adicionar método `delete(id)` no repository, service e controller
- Adicionar botão de deletar (ícone trash) ao lado do editar em cada card
- Adicionar método `delete(id)` no `ItemsService` do frontend
- Atualizar lista via `GestaoState.load()` após exclusão
- Testes de backend (sucesso, 404) e frontend (comportamento do botão)

## Capabilities

### New Capabilities
- `deletar-item`: deletar item existente via botão na listagem e endpoint DELETE

### Modified Capabilities
- `listar-itens`: listagem exibe botão de deletar ao lado do editar em cada card

## Impact

- **backend**: nova rota, métodos repository/service/controller, testes
- **frontend**: botão trash no item-list, `delete(id)` no ItemsService, testes
- **shared-types**: sem alterações

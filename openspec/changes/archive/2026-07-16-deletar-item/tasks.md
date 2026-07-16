## 1. Backend — DELETE endpoint

- [x] 1.1 Adicionar método `delete(id)` no `items.repository.ts`
- [x] 1.2 Adicionar método `delete(id)` no `items.service.ts` (com 404 se não existir)
- [x] 1.3 Adicionar handler `@Delete(':id')` no `items.controller.ts`
- [x] 1.4 Adicionar testes: DELETE com sucesso (200), DELETE item inexistente (404)

## 2. Frontend — Service e botão

- [x] 2.1 Adicionar método `delete(id)` no `ItemsService`
- [x] 2.2 Importar `LucideTrash2` no `item-list.ts`
- [x] 2.3 Adicionar botão trash ao lado do editar no `item-list.html`
- [x] 2.4 Implementar `onDelete(item)` que chama `ItemsService.delete()` e `GestaoState.load()` em caso de sucesso (método em `GestaoState`)

## 3. Testes frontend

- [x] 3.1 Adicionar teste: botão trash aparece em cada card
- [x] 3.2 Adicionar teste: clique no trash chama `ItemsService.delete()`
- [x] 3.3 Adicionar teste: após DELETE, `GestaoState.load()` é chamado

## 4. Validação final

- [x] 4.1 Rodar `npm exec nx test backend` (25 passed)
- [x] 4.2 Rodar `npm exec nx test frontend` (10 passed)
- [x] 4.3 Rodar `npm exec nx build frontend` (success)

## 1. Shared-Types

- [x] 1.1 Adicionar tipo `UpdateItemDto` em `shared-types/src/lib/item.ts` com campos `name`, `image`
- [x] 1.2 Exportar `UpdateItemDto` no índice de `shared-types`
- [x] 1.3 Rebuild shared-types: `npm exec nx build shared-types`

## 2. Backend — UpdateItemDto e controller

- [x] 2.1 Criar `backend/src/app/items/domain/update-item.dto.ts` (mesma validação de CreateItemDto)
- [x] 2.2 Adicionar método `update(id, data)` em `items.repository.ts`
- [x] 2.3 Adicionar método `update(id, dto)` em `items.service.ts`
- [x] 2.4 Adicionar handler `@Put(':id')` em `items.controller.ts` chamando service
- [x] 2.5 Adicionar testes de controller para PUT (sucesso, 404, 400)

## 3. Frontend — Dependência e service

- [x] 3.1 Instalar `lucide-angular` no frontend
- [x] 3.2 Adicionar método `update(id, dto)` em `ItemsService`

## 4. Frontend — Refatorar modal para criar/editar

- [x] 4.1 Adicionar `editingItem = input<IItem | undefined>(undefined)` no `item-modal`
- [x] 4.2 Ajustar lógica de submit para enviar PUT quando `editingItem` existir
- [x] 4.3 Atualizar template do modal: título condicional ("Adicionar Item" / "Editar Item"), botão condicional ("Salvar" / "Atualizar")
- [x] 4.4 Garantir que ao abrir edição os signals `name()` e `image()` são preenchidos com valores do item (linkedSignal)
- [x] 4.5 Atualizar testes do modal para cobrir modo edição

## 5. Frontend — Listagem e botão de editar

- [x] 5.1 Adicionar botão pencil (ícone `lucide-angular`) em cada card no `item-list`, abaixo do nome
- [x] 5.2 Configurar `gestao-page` para gerenciar estado `editingItem` e passá-lo ao modal
- [x] 5.3 Implementar `editItem(item)` que abre modal com item selecionado
- [x] 5.4 Ao salvar edição, fechar modal, resetar `editingItem` e recarregar lista
- [x] 5.5 Atualizar testes do frontend

## 6. Validação final

- [x] 6.1 Rodar `npm exec nx build shared-types`
- [x] 6.2 Rodar `npm exec nx test backend`
- [x] 6.3 Rodar `npm exec nx test frontend`
- [x] 6.4 Rodar `npm exec nx build backend` (implícito em 6.2)
- [x] 6.5 Rodar `npm exec nx build frontend`

## 1. shared-types

- [x] 1.1 Remover `description` do tipo `CreateItemDto` em `shared-types/src/lib/item.ts`
- [x] 1.2 Remover `description` da interface `IItem` em `shared-types/src/lib/item.ts`
- [x] 1.3 Rebuild shared-types: `npm exec nx build shared-types`

## 2. Backend - Entidade e DTO

- [x] 2.1 Remover campo `description` e validação `@IsNotEmpty @MaxLength(1000)` do `CreateItemDto` em `backend/src/app/items/domain/create-item.dto.ts`
- [x] 2.2 Remover coluna `description` da entidade `ItemEntity` em `backend/src/app/items/domain/item.entity.ts`

## 3. Backend - Migration

- [x] 3.1 Criar migration para dropar a coluna `description` da tabela `items` usando TypeORM
- [x] 3.2 Executar a migration no banco

## 4. Backend - Testes

- [x] 4.1 Remover cenários de `description` do `items.controller.spec.ts` (testes 5.5)
- [x] 4.2 Remover `description` dos mocks no `items.service.spec.ts`

## 5. Frontend - Modal

- [x] 5.1 Remover `description` signal do `item-modal.ts`
- [x] 5.2 Atualizar `isFormValid` computed para validar apenas `name` e `image`
- [x] 5.3 Remover `description` do body do POST no método `onSubmit`
- [x] 5.4 Remover campo de texto `description` do template `item-modal.html` (textarea e label)

## 6. Frontend - Testes

- [x] 6.1 Remover `description` dos testes no `item-modal.spec.ts`
- [x] 6.2 Remover `description` dos mocks no `item-list.spec.ts`

## 7. Verificação Final

- [x] 7.1 Rodar testes do backend: `npm exec nx test backend`
- [x] 7.2 Rodar testes do frontend: `npm exec nx test frontend`
- [x] 7.3 Rodar build do backend: `npm exec nx build backend`
- [x] 7.4 Rodar build do frontend: `npm exec nx build frontend`
- [x] 7.5 Verificar se não há referências residuais a `description` no código de criação

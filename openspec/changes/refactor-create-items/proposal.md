## Why

O formulário de criação de itens possui o campo `description` que não é mais utilizado. Remover a descrição simplifica o formulário, reduz a quantidade de dados armazenados e elimina validações desnecessárias.

## What Changes

- Remover `description` do tipo `CreateItemDto` e da interface `IItem` no pacote `shared-types`
- Remover `description` do formulário de criação no frontend (componente `item-modal`)
- Remover `description` da entidade `ItemEntity` e do DTO `CreateItemDto` no backend
- Criar migration para dropar a coluna `description` da tabela `items`
- Atualizar todos os testes afetados pela mudança

## Capabilities

### New Capabilities

- Nenhuma

### Modified Capabilities

- `criar-item`: remover o campo `description` do contrato e formulário de criação de itens

## Impact

- **shared-types**: tipos `IItem` e `CreateItemDto` perdem o campo `description` (**BREAKING**)
- **backend**: entidade, DTO, validação e migration precisam ser alterados
- **frontend**: formulário modal perde o campo de descrição
- **testes**: testes do backend (controller, service) e frontend (item-modal, item-list) precisam ser atualizados

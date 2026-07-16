## Why

O módulo de gestão atualmente permite apenas criar e listar itens. Não há como editar um item já cadastrado caso o anfitrião precise corrigir o nome ou trocar a imagem. Adicionar a funcionalidade de edição completa o ciclo de gestão dos itens.

## What Changes

- Adicionar `UpdateItemDto` em `shared-types` com campos `name` e `image`
- Adicionar endpoint `PUT /api/items/:id` no backend para atualizar um item
- Adicionar método `update` no service e repository do backend
- Refatorar `item-modal` para suportar modo "criar" e "editar" via `@Input() editingItem`
- Adicionar botão de editar (ícone pencil) no card de cada item na listagem
- Adicionar método `update` no `ItemsService` do frontend
- Instalar `lucide-angular` para o ícone pencil
- Atualizar `gestao-page` para gerenciar estado do item em edição
- Adicionar testes para o novo fluxo no backend e frontend

## Capabilities

### New Capabilities

- `editar-item`: editar nome e imagem de um item existente via modal e endpoint PUT

### Modified Capabilities

- `criar-item`: modal de criação será refatorado para também servir como modal de edição; spec existente precisa ser atualizado para refletir o comportamento compartilhado do modal

## Impact

- **shared-types**: novo tipo `UpdateItemDto` exportado
- **backend**: nova rota, DTO, métodos no service e repository, novos testes
- **frontend**: refatoração do `item-modal`, alterações em `item-list`, `gestao-page`, `items.service`, instalação de `lucide-angular`, novos testes
- **dependências**: `lucide-angular` adicionado ao `package.json`

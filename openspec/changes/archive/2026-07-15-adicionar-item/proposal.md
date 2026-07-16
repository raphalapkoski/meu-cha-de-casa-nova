## Why

Os anfitriões precisam cadastrar itens que desejam receber como presente no chá de casa nova, mas atualmente não há nenhuma funcionalidade de cadastro. Implementar a criação de itens é o primeiro passo para viabilizar a lista de presentes.

## What Changes

- Criar tipo `IItem` e `CreateItemDto` em `shared-types`
- Criar endpoint `POST /api/items` no backend NestJS com validação estrita
- Criar página `/gestao` no frontend Angular com botão "Adicionar Item" que abre modal de criação
- Modal com formulário: name, description, image (upload), status fixo `available`
- POST retorna HTTP 201 com o item criado
- Testes unitários: backend valida 400/201; frontend valida estado inicial dos signals

## Capabilities

### New Capabilities
- `criar-item`: cadastro de um item que o anfitrião deseja receber como presente, incluindo modal de criação no frontend e endpoint de criação no backend

### Modified Capabilities
*(Nenhuma — não existem specs prévias)*

## Impact

- **shared-types**: novo arquivo `item.ts` com interface `IItem` e tipo `CreateItemDto`
- **backend**: novo módulo `ItemsModule` com `ItemsController`, `ItemsService`, `ItemsRepository` e `ItemEntity` (domain); registro no `AppModule`; `ValidationPipe` global
- **frontend**: nova página `GestaoPageComponent` standalone, novo modal `ItemModalComponent` standalone com signals; rota `/gestao`
- **dependências adicionar**: `class-validator`, `class-transformer` no backend
- **testes**: Jest no backend (controller e service), Vitest no frontend (signals)

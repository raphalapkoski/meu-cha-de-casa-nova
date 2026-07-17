## Why

No módulo de convidado, os itens da lista de chá de casa nova são exibidos apenas para visualização. Não há como um convidado sinalizar que comprou um item, o que gera duplicidade de compras e frustração. Permitir que convidados marquem itens como "comprados" resolve esse problema e melhora a experiência do usuário.

## What Changes

- Novo endpoint `PATCH /api/items/:id/marcar-compra` no backend que altera status de `available` para `unavailable`
- Novo botão "Oba, comprei este!" no componente `item-convidado-list`
- Diálogo de confirmação "Confirmar a compra de [nome do item]?" com Sim/Não
- Animação de fogos de artifício em caso de sucesso
- Novos métodos `marcarCompra(id)` em `ConvidadoItemsService` e `ConvidadoState`
- Testes de frontend (Vitest) e backend (Jest + supertest)

## Capabilities

### New Capabilities

- `marcar-compra`: Permite um convidado marcar item como comprado, com confirmação e feedback visual.

### Modified Capabilities

- Nenhuma — capability nova, sem alteração de requisitos em capabilities existentes.

## Impact

- **Backend**: Novo endpoint, reusa `ItemsRepository` e `ItemEntity` existentes
- **Frontend**: Adições em `ConvidadoItemsService`, `ConvidadoState`, `item-convidado-list`, novo dialog de confirmação
- **Shared-types**: Nenhuma alteração necessária (status `unavailable` já existe no enum `ItemStatus`)

## Context

O fluxo de criação de itens possui um campo `description` que atravessa três camadas: shared-types (contrato), backend (entidade, DTO, validação, migration, testes) e frontend (formulário, estado, testes).

A remoção precisa ser coordenada para evitar quebras entre os pacotes. O shared-types é consumido tanto pelo backend (build webpack) quanto pelo frontend (Angular), então a alteração no contrato exige rebuild do shared-types antes dos demais.

## Goals / Non-Goals

**Goals:**
- Remover `description` do tipo `CreateItemDto` e `IItem` em shared-types
- Remover `description` do DTO, entidade e validação no backend
- Dropar a coluna `description` da tabela `items` via migration
- Remover o campo `description` do formulário modal no frontend
- Atualizar todos os testes existentes

**Non-Goals:**
- Alterar a estrutura da listagem de itens (GET /api/items continuará retornando os mesmos campos, exceto description)
- Alterar o layout ou funcionalidade de outros componentes
- Alterar o banco de dados além da remoção da coluna

## Decisions

**1. Migration via TypeORM (não synchronize)**
O banco está com `synchronize: false` e usa migrations explícitas. Uma nova migration será gerada com `ALTER TABLE items DROP COLUMN description`. Isso mantém o controle de versão do schema.

**2. Remoção do campo em vez de torná-lo opcional**
O campo não é mais usado em nenhuma parte do sistema. Remover completamente evita dados órfãos e simplifica a validação.

**3. Ordem de implementação: shared-types → backend → frontend**
shared-types precisa ser rebuildado primeiro (`nx build shared-types`) para que backend e frontend consumam o contrato atualizado. Depois backend (entity, dto, migration, testes), depois frontend (modal, testes).

## Risks / Trade-offs

- [**BREAKING**] A interface `IItem` perde `description` — qualquer código que acesse `item.description` quebrará. Será necessário verificar se há referências em outras partes do sistema.
- A migration dropa a coluna permanentemente — dados existentes de `description` serão perdidos. Sem rollback de dados, apenas schema (via `down` da migration).
- O frontend depende de `ImageItem` em `item-list.spec.ts` para mocks — esses mocks precisam ser atualizados para não incluir `description`.

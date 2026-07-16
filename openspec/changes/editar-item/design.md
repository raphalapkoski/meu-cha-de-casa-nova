## Context

O módulo de gestão atualmente possui criação e listagem de itens. A funcionalidade de edição era a lacuna restante no CRUD. O backend já possui service e repository com métodos `create`, `findAll` e `findOne` — será adicionado `update`. O frontend possui um modal de criação reaproveitável que será estendido para também servir edição.

A arquitetura segue o padrão NestJS (controller → service → repository) com webpack no backend e Angular NgModule no frontend. O layout dos cards na listagem foi definido como: imagem → nome → botões (em vez de data-table).

## Goals / Non-Goals

**Goals:**
- Adicionar `UpdateItemDto` em `shared-types` (mesma shape de `CreateItemDto`)
- Implementar `PUT /api/items/:id` com validação e tratamento de 404
- Refatorar `item-modal` com `editingItem = input<IItem | undefined>(undefined)` para alternar entre modo criar e editar
- Adicionar botão pencil em cada card (layout: imagem → nome → botão)
- Gerenciar estado `editingItem` na `gestao-page`
- Adicionar método `update` no `ItemsService` do frontend
- Instalar `lucide-angular` para o ícone pencil

**Non-Goals:**
- Edição de `status` do item (não faz parte do escopo)
- Exclusão de itens (fora do escopo)
- Paginação ou busca na listagem

## Decisions

1. **Reutilizar modal vs criar modal separado**: Reutilizar o `item-modal` com `editingItem = input<IItem | undefined>()` evita duplicação de template e lógica. O modal alterna entre POST e PUT baseado na presença de `editingItem`.

2. **`UpdateItemDto` idêntico a `CreateItemDto`**: Ambos compartilham os mesmos campos (`name`, `image`). Poderia ser o mesmo tipo, mas tipos separados são semanticamente mais claros e permitem evolução independente.

3. **`lucide-angular` para ícone pencil**: Biblioteca de ícones já consolidada no ecossistema Angular. Alternativa seria SVG inline, mas `lucide-angular` oferece consistência e acessibilidade.

4. **Layout imagem → nome → botão**: A sequência visual (imagem grande, nome centralizado, botão abaixo) segue o padrão especificado pelo usuário, substituindo o data-table anterior.

5. **PUT vs PATCH**: PUT foi escolhido porque o payload sempre contém `name` e `image` completos (substituição total dos campos editáveis), alinhado com semântica REST de PUT.

## Risks / Trade-offs

- **[Risco] Modal reutilizado pode ficar complexo** → Manter lógica condicional simples: `isEditing = computed(() => !!editingItem())`, sem signals separados para criar/editar.
- **[Risco] `lucide-angular` adiciona dependência** → Biblioteca leve e tree-shakeable, impacto mínimo no bundle final.
- **[Risco] Base64 grande na edição** → Mesma limitação já existente na criação; aceito para o escopo atual.

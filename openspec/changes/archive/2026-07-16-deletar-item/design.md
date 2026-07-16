## Context

O módulo de gestão já possui criação, listagem e edição de itens. A deleção é a última operação CRUD a ser implementada. O `GestaoState` centraliza o estado da listagem com `load()` para recarregar após alterações.

## Goals / Non-Goals

**Goals:**
- Implementar `DELETE /api/items/:id` com retorno 200 (sucesso) ou 404 (não encontrado)
- Adicionar método `delete(id)` no repository, service e controller
- Adicionar botão trash no card do item (ao lado do pencil)
- Chamar `GestaoState.load()` após exclusão bem-sucedida
- Testes de backend e frontend

**Non-Goals:**
- Confirmação visual (modal "tem certeza?") — não faz parte do escopo
- Soft delete — deleção física direta no banco

## Decisions

1. **DELETE vs soft delete**: DELETE físico é suficiente para o escopo atual. O item é removido definitivamente do banco.

2. **Botão trash ao lado do editar**: Segue o mesmo padrão do botão pencil, usando `lucide-angular` (ícone `LucideTrash2`). Posicionado no mesmo container flex do botão editar.

3. **Confirmação**: Sem modal de confirmação por ora. O clique deleta diretamente. Pode ser adicionado futuramente se necessário.

4. **Reutilizar `GestaoState.load()`**: Após o DELETE bem-sucedido, chama `gestaoState.load()` para recarregar a lista — mesmo padrão do create/update.

## Risks / Trade-offs

- **[Risco] Exclusão acidental sem confirmação** → Aceito para simplificação inicial; pode-se adicionar confirmação posteriormente.
- **[Risco] Concorrência**: se dois utilizadores apagarem o mesmo item, o segundo recebe 404 — comportamento esperado e tratado.

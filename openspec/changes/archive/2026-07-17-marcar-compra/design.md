## Context

O sistema atual permite que convidados visualizem itens da lista de chá de casa nova, mas não há interação. Donos podem cadastrar, editar e remover itens via módulo `gestao`. O módulo `convidado` é read-only e consome o mesmo banco PostgreSQL via `ItemsRepository` compartilhado. O status dos itens é controlado pelo enum `ItemStatus` (`available` | `unavailable`).

## Goals / Non-Goals

**Goals:**

- Permitir que convidados marquem um item como comprado
- Exibir confirmação antes da ação
- Fornecer feedback visual (fogos de artifício + mensagem "Obrigado, aguardamos sua presença dia 04/09") em caso de sucesso
- Impedir que um item já comprado seja marcado novamente
- Cobrir a funcionalidade com testes

**Non-Goals:**

- Autenticação/autorização de convidados (qualquer um pode marcar)
- Desfazer compra (rollback da ação é fora de escopo)
- Notificação ao dono da lista
- Histórico de compras
- Integração com pagamento ou checkout

## Decisions

| Decisão | Opção Escolhida | Alternativa | Motivo |
|---------|----------------|-------------|--------|
| **Método HTTP** | `PATCH /api/items/:id/marcar-compra` | `POST /api/convidado/comprar` | Reusa nomenclatura REST e recurso `items`; PATCH é semanticamente correto (atualização parcial) |
| **Controller** | `ItemsController` (existente) | Novo controller `CompraController` | Ação age sobre `ItemEntity`; reusa mesma validação, mesmos pipes, mesmo módulo |
| **Validação** | Service valida status antes de alterar | Validar via DTO ou banco | Sem DTO necessário (só `id`); validação em service é mais simples e direta |
| **Animação** | `canvas-confetti` (npm) | CSS puro | Lib leve (~5KB), efeito visual rico, sem esforço manual de animação |
| **Diálogo** | `hlm-dialog` (já existe no projeto) | HTML nativo `confirm()` | Reusa componente Spartan já configurado; mantém consistência visual |
| **Compartilhamento back/front** | Sem alteração em `shared-types` | Adicionar tipo `MarcarCompraResponse` | Status `unavailable` já existe no enum; endpoint retorna `IItem` existente |
| **Mensagem pós-compra** | `canvas-confetti` + `<span>` sobreposto com texto "Obrigado, aguardamos sua presença dia 04/09" | Apenas confetes | Mensagem personalizada do evento; overlay estilizado com fade out após alguns segundos |

## Risks / Trade-offs

- **Sem autenticação**: Qualquer pessoa com o link pode marcar itens como comprados. Mitigação: escopo deliberado, fora dos objetivos atuais.
- **Sem rollback**: Se um convidado marcar por engano, não há como desfazer. Mitigação: diálogo de confirmação reduz enganos.
- **Concorrência**: Dois convidados podem tentar comprar o mesmo item simultaneamente. Mitigação: o banco aceita a primeira escrita; a segunda recebe 400 ("já comprado").

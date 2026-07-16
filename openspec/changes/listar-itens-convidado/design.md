## Context

O sistema atualmente possui um módulo de gestão (admin) que lista itens com ações de editar/excluir. Os convidados não têm uma interface própria — precisam de uma versão pública e simplificada que exiba apenas imagem e nome dos itens disponíveis.

A arquitetura existente usa:
- **Frontend**: Angular standalone components, signals para estado, Spartan UI, Tailwind CSS
- **Backend**: NestJS modular (controller → service → repository), TypeORM, validação com class-validator
- **Shared types**: `@meu-cha-de-casa-nova/shared-types` com interface `IItem`

## Goals / Non-Goals

**Goals:**
- Criar endpoint `GET /api/convidado/items` que retorna todos os itens (reutilizando o repositório existente)
- Criar página pública `/convidado` com listagem simplificada (imagem + nome)
- Seguir o padrão de componentes standalone, signals e lazy-loading já estabelecido
- Cobertura de testes: front-end (Vitest) e back-end (Jest)

**Non-Goals:**
- Não criar autenticação/autorização para a rota de convidado
- Não permitir que convidados criem, editem ou excluam itens
- Não alterar o módulo de gestão existente
- Não alterar shared-types (reutilizar `IItem` existente)

## Decisions

### 1. Novo módulo back-end `convidado` em vez de reutilizar `items` controller
- **Decisão**: Criar `ConvidadoController` com endpoint `GET /api/convidado/items` que reutiliza `ItemsRepository` existente
- **Por quê**: Separação clara entre API pública (convidado) e administrativa (gestão). O controller de convidado pode futuramente ter regras diferentes (ex: filtrar apenas itens disponíveis) sem impactar a gestão.
- **Alternativa considerada**: Adicionar um filtro no `ItemsController` existente. Rejeitado porque misturaria responsabilidades de admin e público no mesmo controller.

### 2. Front-end: novo módulo `convidado` seguindo o padrão `gestao`
- **Decisão**: Criar `ConvidadoPage` (página) e `ItemConvidadoList` (componente de listagem) em `frontend/src/app/features/convidado/`, com `ConvidadoState` para gerenciamento de estado via signals
- **Por quê**: Segue exatamente o padrão estabelecido pelo módulo `gestao` — página com providers de estado, componente de listagem que injeta o estado, signals para reatividade
- **Alternativa considerada**: Reutilizar `ItemList` com inputs de configuração. Rejeitado porque a listagem de convidado tem propósito e visual diferentes (sem ações, sem modal)

### 3. Endpoint reutiliza `ItemsRepository` em vez de duplicar acesso a dados
- **Decisão**: O `ConvidadoService` injeta `ItemsRepository` diretamente para buscar itens
- **Por quê**: Evita duplicação de lógica de acesso a dados. O repositório é a camada correta para reuso entre serviços
- **Alternativa considerada**: Injetar `ItemsService`. Rejeitado porque o service tem regras de negócio da gestão (ex: validações de update/delete) que não fazem sentido para o convidado

### 4. Rota `/convidado` sem autenticação
- **Decisão**: A rota `/convidado` será pública (sem guardas de autenticação)
- **Por quê**: Convidados não têm login. A interface é intencionalmente pública e somente leitura
- **Risco**: Qualquer pessoa com o link pode ver os itens. Aceito como trade-off intencional

## Risks / Trade-offs

- **[Risco] Rota pública expõe itens**: Qualquer pessoa com o link pode ver a lista de itens. → **Mitigação**: O endpoint é somente leitura e não expõe dados sensíveis. Se necessário no futuro, pode-se adicionar um token de convite.
- **[Risco] Duplicação de controller**: Ter `ItemsController` e `ConvidadoController` pode causar divergência se um for alterado e o outro não. → **Mitigação**: Ambos usam o mesmo `ItemsRepository`, garantindo consistência dos dados.
- **[Trade-off] Sem paginação**: A listagem retorna todos os itens de uma vez. Aceitável para o volume esperado (dezenas de itens). Se crescer, adicionar paginação depois.

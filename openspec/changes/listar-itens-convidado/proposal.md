## Why

Os convidados da festa precisam de uma interface simples para visualizar os itens disponíveis e escolher quais desejam trazer. Atualmente, a listagem de itens só existe no módulo de gestão (admin), sem uma versão pública e simplificada para os convidados.

## What Changes

- Novo módulo **convidado** no front-end com uma página pública de listagem de itens
- Novo módulo **convidado** no back-end com endpoint `GET /api/convidado/items` que retorna a lista de itens
- A listagem do convidado deve ser uma versão simplificada da gestão: apenas imagem e nome do item (sem ações de editar/excluir)
- Testes no front-end para o estado da página e seus componentes
- Testes no back-end para garantir retorno 200 com lista (dados ou vazia)

## Capabilities

### New Capabilities
- `listar-itens-convidado`: Listagem pública de itens para convidados, com endpoint dedicado e interface simplificada (imagem + nome)

### Modified Capabilities
- *(nenhuma — as specs existentes de gestão não são alteradas)*

## Impact

- **Backend**: Novo módulo `convidado` com controller, service e endpoint `GET /api/convidado/items`
- **Frontend**: Nova feature module `convidado/` com página e componente de listagem, nova rota `/convidado`
- **Testes**: Testes de front-end (Vitest) para o estado da página e componentes; testes de back-end (Jest) para o controller
- **Nenhuma alteração** nos módulos existentes de gestão, itens ou shared-types

## ADDED Requirements

### Requirement: Convidado pode listar itens via API

O sistema DEVE expor o endpoint `GET /api/convidado/items` que retorna a lista de todos os itens cadastrados. A resposta DEVE ser um array JSON de objetos `IItem` (id, name, image, status). O endpoint NÃO DEVE exigir autenticação.

#### Scenario: Listagem com itens cadastrados

- **WHEN** uma requisição `GET /api/convidado/items` é feita e existem itens cadastrados
- **THEN** o sistema retorna HTTP 200 com um array contendo os itens

#### Scenario: Listagem sem itens cadastrados

- **WHEN** uma requisição `GET /api/convidado/items` é feita e não existem itens cadastrados
- **THEN** o sistema retorna HTTP 200 com um array vazio `[]`

### Requirement: Convidado pode visualizar itens na página pública

O sistema DEVE exibir uma página pública na rota `/convidado` com a listagem simplificada dos itens: imagem (`<img>`) e nome do item. A página NÃO DEVE exibir ações de editar ou excluir. Enquanto carrega, DEVE exibir um indicador de carregamento. Se não houver itens, DEVE exibir uma mensagem indicando lista vazia.

#### Scenario: Página exibe lista de itens

- **WHEN** o convidado acessa `/convidado` e existem itens cadastrados
- **THEN** a página exibe os itens com imagem e nome, sem ações de editar/excluir

#### Scenario: Página exibe estado de carregamento

- **WHEN** o convidado acessa `/convidado` e os dados estão sendo carregados
- **THEN** a página exibe um indicador de carregamento

#### Scenario: Página exibe lista vazia

- **WHEN** o convidado acessa `/convidado` e não existem itens cadastrados
- **THEN** a página exibe uma mensagem informando que não há itens disponíveis

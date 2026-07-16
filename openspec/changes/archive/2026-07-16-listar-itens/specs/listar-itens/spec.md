## ADDED Requirements

### Requirement: Listar itens via API
O sistema SHALL expor um endpoint GET /api/items que retorna todos os itens cadastrados.

O retorno SHALL ser um array de objetos no formato IItem conforme definido em shared-types, contendo id, 
ame, image e status.

#### Scenario: Lista cheia
- **WHEN** o anfitrião acessa GET /api/items e existem itens no banco
- **THEN** o sistema retorna HTTP 200 com um array de itens JSON

#### Scenario: Lista vazia
- **WHEN** o anfitrião acessa GET /api/items e não existem itens no banco
- **THEN** o sistema retorna HTTP 200 com um array vazio []

### Requirement: Exibir listagem de itens na página de gestão
O frontend SHALL exibir uma listagem de itens na página /gestao, posicionada abaixo do botão "Adicionar Item".

A listagem SHALL usar o data-table do Spartan UI (hlm-table), exibindo:
- **Coluna 1**: Miniatura da imagem do item (thumbnail)
- **Coluna 2**: Nome do item

Apenas esses dois dados SHALL ser visíveis na tabela.

#### Scenario: Lista cheia na página
- **WHEN** o anfitrião navega para /gestao e existem itens cadastrados
- **THEN** a página exibe o data-table com as linhas contendo miniatura e nome de cada item

#### Scenario: Lista vazia na página
- **WHEN** o anfitrião navega para /gestao e não existem itens cadastrados
- **THEN** a página exibe a mensagem "Ops, ainda não há nenhum item cadastrado."

### Requirement: Posicionamento da listagem
O componente de listagem SHALL estar posicionado abaixo do botão "Adicionar Item" na página /gestao.

#### Scenario: Botão acima da lista
- **WHEN** o anfitrião navega para /gestao
- **THEN** o botão "Adicionar Item" aparece acima da listagem de itens

### Requirement: Carregamento dos itens
O frontend SHALL buscar os itens via GET /api/items ao carregar a página /gestao.

#### Scenario: Loading state
- **WHEN** a página /gestao carrega e a requisição GET /api/items está em andamento
- **THEN** o data-table exibe um indicador de carregamento (skeleton)

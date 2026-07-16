## MODIFIED Requirements

### Requirement: Exibir página de gestão com modal de criação **e listagem de itens**
O frontend SHALL exibir uma página /gestao com um botão "Adicionar Item" que abre um modal para o cadastro, **e abaixo do botão a listagem dos itens cadastrados**.

#### Scenario: Estado inicial da página
- **WHEN** o anfitrião navega para /gestao
- **THEN** a página exibe o botão "Adicionar Item", o modal está fechado **e a listagem de itens é carregada**

#### Scenario: Abrir modal
- **WHEN** o anfitrião clica em "Adicionar Item"
- **THEN** o modal abre com campos vazios e status padrão 'available'

#### Scenario: Estado inicial dos signals no modal
- **WHEN** o modal abre
- **THEN** 
ame() é '', description() é '', image() é '', isFormValid() é alse, isSubmitting() é alse

#### Scenario: Preencher name torna formulário válido
- **WHEN** o anfitrião preenche o campo 
ame
- **THEN** isFormValid() torna-se 	rue

#### Scenario: Submissão bem-sucedida via modal
- **WHEN** o anfitrião preenche name, description, seleciona uma imagem e clica em "Salvar"
- **THEN** o frontend envia POST /api/items com os dados + base64 da imagem e exibe mensagem de sucesso

#### Scenario: Upload de imagem
- **WHEN** o anfitrião seleciona um arquivo de imagem no modal
- **THEN** o frontend converte o arquivo para base64 via FileReader e armazena no signal image()

#### Scenario: Lista cheia na página
- **WHEN** o anfitrião navega para /gestao e existem itens cadastrados
- **THEN** a página exibe o data-table com as linhas contendo miniatura e nome de cada item

#### Scenario: Lista vazia na página
- **WHEN** o anfitrião navega para /gestao e não existem itens cadastrados
- **THEN** a página exibe a mensagem "Ops, ainda não há nenhum item cadastrado." e o botão "Adicionar Item" permanece visível

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

### Requirement: Carregamento dos itens
O frontend SHALL buscar os itens via GET /api/items ao carregar a página /gestao.

#### Scenario: Loading state
- **WHEN** a página /gestao carrega e a requisição GET /api/items está em andamento
- **THEN** o data-table exibe um indicador de carregamento (skeleton)

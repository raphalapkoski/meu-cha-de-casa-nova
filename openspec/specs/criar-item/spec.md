## Added Requirements

### Requirement: Cadastrar item
O sistema SHALL permitir que o anfitrião cadastre um novo item na lista de presentes via `POST /api/items`.

O item SHALL conter os seguintes campos:
- `name` (string, obrigatório, max 255 caracteres)
- `image` (string base64, obrigatório)
- `status` (enum: `'available'` | `'unavailable'`) — NÃO enviado pelo cliente; o backend define como `'available'`

O campo `id` (int) SHALL ser gerado automaticamente pelo backend.

#### Scenario: Cadastro bem-sucedido
- **WHEN** o anfitrião envia POST `/api/items` com `name` e `image` (base64) válidos
- **THEN** o sistema retorna HTTP 201 com o JSON do item criado (incluindo id gerado e status `'available'`)

#### Scenario: Cadastro sem name
- **WHEN** o anfitrião envia POST `/api/items` sem o campo `name`
- **THEN** o sistema retorna HTTP 400 Bad Request com erro indicando que `name` é obrigatório

#### Scenario: Cadastro com name vazio
- **WHEN** o anfitrião envia POST `/api/items` com `name` vazio
- **THEN** o sistema retorna HTTP 400 Bad Request com erro indicando que `name` não pode estar vazio

#### Scenario: Cadastro com name excedendo 255 caracteres
- **WHEN** o anfitrião envia POST `/api/items` com `name` maior que 255 caracteres
- **THEN** o sistema retorna HTTP 400 Bad Request

#### Scenario: Cadastro com status no body
- **WHEN** o anfitrião envia POST `/api/items` com o campo `status` no body
- **THEN** o sistema retorna HTTP 400 Bad Request (status não é permitido no payload)

#### Scenario: Cadastro com campo extra desconhecido
- **WHEN** o anfitrião envia POST `/api/items` com campos não definidos no DTO
- **THEN** o sistema retorna HTTP 400 Bad Request

### Requirement: Exibir página de gestão com modal de criação e listagem de itens
O frontend SHALL exibir uma página /gestao com um botão "Adicionar Item" que abre um modal para o cadastro, e abaixo do botão a listagem dos itens cadastrados.

O modal SHALL ser reutilizado para criação e edição de itens. No modo criação, o modal abre com campos vazios e título "Adicionar Item". No modo edição, o modal abre com campos pré-preenchidos e título "Editar Item". O modo é determinado pela presença de um `editingItem` opcional.

O estado `editingItem` SHALL ser gerenciado pela página de gestão: ao clicar no botão pencil de um card, `editingItem` recebe o item selecionado; ao fechar o modal ou submeter com sucesso, `editingItem` retorna a `undefined`.

#### Scenario: Estado inicial da página
- **WHEN** o anfitrião navega para /gestao
- **THEN** a página exibe o botão "Adicionar Item", o modal está fechado, `editingItem` é `undefined` e a listagem de itens é carregada

#### Scenario: Abrir modal no modo criação
- **WHEN** o anfitrião clica em "Adicionar Item"
- **THEN** o modal abre com título "Adicionar Item", campos vazios e botão "Salvar"

#### Scenario: Abrir modal no modo edição
- **WHEN** o anfitrião clica no ícone pencil de um item
- **THEN** o modal abre com título "Editar Item", campos pré-preenchidos e botão "Atualizar"

#### Scenario: Estado inicial dos signals no modal
- **WHEN** o modal abre no modo criação
- **THEN** `name()` é `''`, `image()` é `''`, `isFormValid()` é `false`, `isSubmitting()` é `false`

#### Scenario: Preencher name e imagem torna formulário válido
- **WHEN** o anfitrião preenche o campo `name` e seleciona/fornece uma imagem
- **THEN** `isFormValid()` torna-se `true`

#### Scenario: Submissão bem-sucedida via modal (criação)
- **WHEN** o anfitrião preenche name, seleciona uma imagem e clica em "Salvar"
- **THEN** o frontend envia POST /api/items com os dados + base64 da imagem, exibe mensagem de sucesso, fecha o modal e atualiza a lista

#### Scenario: Submissão bem-sucedida via modal (edição)
- **WHEN** o anfitrião altera name ou imagem no modal de edição e clica em "Atualizar"
- **THEN** o frontend envia PUT /api/items/:id com os dados atualizados, exibe mensagem de sucesso, fecha o modal e atualiza a lista

#### Scenario: Fechar modal reseta estado de edição
- **WHEN** o anfitrião fecha o modal (modo edição) sem salvar
- **THEN** `editingItem` retorna a `undefined` e o modal não envia nenhuma requisição

#### Scenario: Upload de imagem
- **WHEN** o anfitrião seleciona um arquivo de imagem no modal
- **THEN** o frontend converte o arquivo para base64 via FileReader e armazena no signal `image()`

#### Scenario: Lista cheia na página
- **WHEN** o anfitrião navega para /gestao e existem itens cadastrados
- **THEN** a página exibe os cards com imagem, nome e botão de editar (ícone pencil) abaixo do nome de cada item

#### Scenario: Lista vazia na página
- **WHEN** o anfitrião navega para /gestao e não existem itens cadastrados
- **THEN** a página exibe a mensagem "Ops, ainda não há nenhum item cadastrado." e o botão "Adicionar Item" permanece visível

### Requirement: Contrato compartilhado (IItem / CreateItemDto)
O tipo `IItem` e o tipo `CreateItemDto` SHALL ser definidos em `shared-types/src/lib/item.ts` e exportados no índice do pacote.

`IItem` SHALL conter: `id`, `name`, `image`, `status`.
`CreateItemDto` SHALL conter: `name`, `image`.

#### Scenario: Backend usa o contrato
- **WHEN** o backend processa POST `/api/items`
- **THEN** o body é validado contra `CreateItemDto` e a resposta é tipada como `IItem`

#### Scenario: Frontend usa o contrato
- **WHEN** o frontend recebe a resposta do backend
- **THEN** o tipo do objeto é `IItem` conforme `shared-types`

### Requirement: Listar itens via API
O sistema SHALL expor um endpoint GET /api/items que retorna todos os itens cadastrados.

O retorno SHALL ser um array de objetos no formato IItem conforme definido em shared-types, contendo id, name, image e status.

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

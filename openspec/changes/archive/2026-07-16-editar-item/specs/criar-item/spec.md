## MODIFIED Requirements

### Requirement: Exibir página de gestão com modal de criação e listagem de itens
O frontend SHALL exibir uma página /gestao com um botão "Adicionar Item" que abre um modal para o cadastro, e abaixo do botão a listagem dos itens cadastrados.

O modal SHALL ser reutilizado para criação e edição de itens. No modo criação, o modal abre com campos vazios e título "Adicionar Item". No modo edição, o modal abre com campos pré-preenchidos e título "Editar Item". O modo é determinado pela presença de um `editingItem` opcional.

O estado `editingItem` SHALL ser gerenciado pela página de gestão: ao clicar no botão pencil de um card, `editingItem` recebe o item selecionado; ao fechar o modal ou submeter com sucesso, `editingItem` retorna a `undefined`.

#### Scenario: Estado inicial da página
- **WHEN** o anfitrião navega para /gestao
- **THEN** a página exibe o botão "Adicionar Item", o modal está fechado, `editingItem` é `undefined` e a listagem de itens é carregada

#### Scenario: Abrir modal no modo criação
- **WHEN** o anfitrião clica em "Adicionar Item"
- **THEN** o modal abre com título "Adicionar Item", campos vazios e botão "Salvar", e `editingItem` permanece `undefined`

#### Scenario: Abrir modal no modo edição
- **WHEN** o anfitrião clica no ícone pencil de um item
- **THEN** o modal abre com título "Editar Item", campos pré-preenchidos e botão "Atualizar", e `editingItem` recebe o item selecionado

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

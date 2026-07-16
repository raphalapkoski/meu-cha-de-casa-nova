## Added Requirements

### Requirement: Editar item via API
O sistema SHALL expor um endpoint `PUT /api/items/:id` para atualizar nome e imagem de um item existente.

O body SHALL aceitar os mesmos campos de `CreateItemDto`: `name` (string, obrigatório, max 255) e `image` (string base64, obrigatório).

O retorno SHALL ser o objeto `IItem` atualizado com HTTP 200.

#### Scenario: Edição bem-sucedida
- **WHEN** o anfitrião envia PUT `/api/items/1` com `name` e `image` (base64) válidos
- **THEN** o sistema retorna HTTP 200 com o JSON do item atualizado

#### Scenario: Edição de item inexistente
- **WHEN** o anfitrião envia PUT `/api/items/999` com dados válidos
- **THEN** o sistema retorna HTTP 404 Not Found

#### Scenario: Edição com name vazio
- **WHEN** o anfitrião envia PUT `/api/items/1` com `name` vazio
- **THEN** o sistema retorna HTTP 400 Bad Request com erro de validação

#### Scenario: Edição com name excedendo 255 caracteres
- **WHEN** o anfitrião envia PUT `/api/items/1` com `name` maior que 255 caracteres
- **THEN** o sistema retorna HTTP 400 Bad Request

#### Scenario: Edição sem image
- **WHEN** o anfitrião envia PUT `/api/items/1` sem o campo `image`
- **THEN** o sistema retorna HTTP 400 Bad Request

### Requirement: Editar item pelo modal
O frontend SHALL permitir que o anfitrião edite um item existente clicando no botão de editar (ícone pencil) no card do item na listagem, abrindo o mesmo modal com os dados pré-preenchidos.

O modal SHALL alternar entre modo "criar" e "editar" conforme receba ou não um `editingItem`. No modo editar o título do modal SHALL ser "Editar Item", os campos SHALL vir pré-preenchidos com os valores atuais, e ao submeter SHALL enviar PUT ao invés de POST.

#### Scenario: Botão de editar aparece em cada card
- **WHEN** o anfitrião visualiza a listagem de itens
- **THEN** cada card exibe o botão de editar (ícone pencil) abaixo do nome do item

#### Scenario: Abrir modal no modo editar
- **WHEN** o anfitrião clica no ícone pencil de um item
- **THEN** o modal abre com título "Editar Item", campos `name` e `image` pré-preenchidos com os valores do item, e botão de submit com texto "Atualizar"

#### Scenario: Submissão de edição bem-sucedida
- **WHEN** o anfitrião altera os dados no modal de edição e clica em "Atualizar"
- **THEN** o frontend envia PUT /api/items/:id com os dados atualizados e exibe mensagem de sucesso

#### Scenario: Edição preserva status
- **WHEN** o anfitrião edita um item
- **THEN** o campo `status` do item NÃO é alterado pela requisição PUT

### Requirement: UpdateItemDto em shared-types
O tipo `UpdateItemDto` SHALL ser definido em `shared-types/src/lib/item.ts` e exportado no índice do pacote.

`UpdateItemDto` SHALL conter: `name`, `image` (mesma shape de `CreateItemDto`).

#### Scenario: Backend usa UpdateItemDto
- **WHEN** o backend processa PUT `/api/items/:id`
- **THEN** o body é validado contra `UpdateItemDto`

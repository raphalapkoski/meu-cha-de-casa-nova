## Why

Após implementar o cadastro de itens, o anfitrião precisa visualizar os itens já cadastrados em uma lista para poder gerenciá-los. Sem essa funcionalidade, não há feedback visual do que foi cadastrado, tornando a página de gestão incompleta.

## What Changes

- **Nova rota GET /api/items** no backend para listar todos os itens cadastrados
- **Novo componente ItemListComponent** no frontend para exibir os itens em uma tabela (data-table do Spartan UI)
- **Integração do ItemListComponent** na página de gestão (/gestao), posicionado abaixo do botão "Adicionar Item"
- **Estado de lista vazia** com mensagem "Ops, ainda não há nenhum item cadastrado."
- **Reutilização do tipo IItem** já existente no shared-types (definido pelo spec criar-item)
- **Apenas leitura**: fora do escopo editar e deletar itens

## Capabilities

### New Capabilities
- listar-itens: Listagem dos itens cadastrados, com endpoint GET no backend e tabela visual no frontend, exibindo miniatura da imagem e nome do produto

### Modified Capabilities
- criar-item: A página /gestao agora também exibe a lista de itens abaixo do botão "Adicionar Item"; o requisito "Exibir página de gestão com modal de criação" deve ser estendido para incluir o estado da listagem

## Impact

- **Backend**: Novo controller/método em ItemsController para GET /api/items; service e repository para listar itens do PostgreSQL
- **Frontend**: Novo componente ItemListComponent na página /gestao; adição do data-table do Spartan UI (brn-table / hlm-table); chamada HTTP para buscar itens
- **Shared-types**: Nenhuma alteração necessária — IItem já possui id, 
ame, image e status
- **Testes**: Testes unitários no backend (Jest) para cenários de lista cheia e lista vazia; testes Vitest no frontend para estado da listagem

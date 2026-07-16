## Context

O sistema já possui o cadastro de itens (POST /api/items) com o modelo IItem definido no shared-types, contendo id, 
ame, description, image (base64), status (vailable | unavailable). A página /gestao exibe um botão "Adicionar Item" que abre um modal de cadastro. Agora é necessário listar os itens cadastrados abaixo desse botão.

## Goals / Non-Goals

**Goals:**
- Endpoint GET /api/items que retorna a lista de itens (id, image, name, status)
- Componente ItemListComponent na página /gestao abaixo do botão "Adicionar Item"
- Uso do data-table do Spartan UI (brn-table / hlm-table) para exibir miniatura (col 1) e nome (col 2)
- Estado de lista vazia com mensagem "Ops, ainda não há nenhum item cadastrado."
- Testes unitários no backend e front-end

**Non-Goals:**
- Edição e deleção de itens
- Paginação, ordenação ou filtros na listagem
- Upload de imagem na listagem (já tratado no cadastro)
- Cache ou lazy loading

## Decisions

| Decisão | Opção escolhida | Alternativas | Motivação |
|---------|----------------|--------------|-----------|
| Endpoint de listagem | GET /api/items sem paginação | GET /api/items?page=1 | Simplicidade; poucos itens por anfitrião |
| ORM query | ind({ order: { id: 'DESC' } }) no Prisma/TypeORM | Query nativa | Consistência com o resto do código |
| Front-end data-table | Spartan UI hlm-table (wrapper do brn-table) | Tabela HTML manual | Padrão do projeto; acessibilidade e responsividade |
| Chamada HTTP | HttpClient com irstValueFrom | Observable direto | Consistência com o padrão Angular moderno (signals) |
| Posição na página | Abaixo do botão "Adicionar Item" | Aba / rota separada | Mantém a gestão centralizada; UX fluida |
| Estado de loading | Skeleton/spinner no data-table | Não mostrar nada | Feedback visual para o usuário |

## Risks / Trade-offs

- **[Performance]** Sem paginação, a lista pode crescer — mitigação: o volume de itens por anfitrião é naturalmente baixo (< 100)
- **[Dados sensíveis]** A imagem em base64 pode tornar a resposta pesada — mitigação: apenas miniatura na listagem; o campo image já está no modelo
- **[Consistência]** O status do item pode mudar entre chamadas — mitigação: aceitável, dado o escopo não-realtime
- **[Testabilidade]** O data-table do Spartan UI renderiza marcação específica — mitigação: testar pelo estado do componente (signals) e conteúdo renderizado

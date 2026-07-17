## Why

O módulo convidado (`features/convidado/`) mistura responsabilidades: o header da página está colado no template da page, e o diálogo de confirmação de compra está dentro do componente de listagem de itens. Isso dificulta manutenção, teste e reuso. O objetivo é organizar o módulo extraindo componentes com responsabilidades únicas.

## What Changes

- Extrair o `<header>` de `convidado-page.html` para um componente `Header` dedicado em `components/header/`
- Extrair o `<hlm-dialog>` de `item-convidado-list.html` para um componente `ConfirmacaoCompra` em `components/confirmacao-compra/`
- Promover `selectedItem`, `dialogState` e `mensagemErro` do `ItemConvidadoList` para `ConvidadoState`, que já gerencia o estado da tela
- Simplificar `convidado-page.html` para conter apenas `<app-header/>` e `<app-item-convidado-list/>`
- Simplificar `item-convidado-list` removendo a lógica do diálogo e consumindo `mensagemErro` diretamente do state
- Ajustar testes existentes e adicionar testes para os novos componentes

## Capabilities

### New Capabilities
*Nenhuma.* Refatoração interna sem novas capacidades funcionais.

### Modified Capabilities
*Nenhuma.* Nenhum comportamento de nível de spec é alterado.

## Impact

- **Frontend**: `features/convidado/` — `convidado-page`, `convidado.state`, criação de `header` e `confirmacao-compra`, modificação de `item-convidado-list`
- **Testes**: `convidado.state.spec.ts` (ajuste + novos testes), `item-convidado-list.spec.ts` (ajuste), novos `header.spec.ts` e `confirmacao-compra.spec.ts`
- **Backend**: sem alterações
- **Shared-types**: sem alterações

## Context

O módulo `features/convidado/` atualmente:

- `convidado-page.html` contém o `<header>` (logo + títulos) acoplado ao template da page
- `item-convidado-list.ts` gerencia `selectedItem`, `dialogState`, `mensagemErro` como signals locais, além da lista e do diálogo
- `convidado.state.ts` gerencia `items`, `loading`, `marcando` — mas não os sinais de UI do diálogo

A refatoração extrai responsabilidades em componentes dedicados e centraliza o estado de tela no `ConvidadoState`.

## Goals / Non-Goals

**Goals:**
- Extrair `<header>` de `convidado-page.html` para `components/header/`
- Extrair `<hlm-dialog>` de `item-convidado-list` para `components/confirmacao-compra/`
- Migrar `selectedItem`, `dialogState`, `mensagemErro` para `ConvidadoState`
- Manter comportamento visual e funcional idêntico

**Non-Goals:**
- Alterar shared-types ou backend
- Alterar estilos ou layout visual
- Adicionar novas funcionalidades (confetes, alertas, etc.)

## Decisions

### 1. Centralizar estado de tela no ConvidadoState
`selectedItem`, `dialogState`, `mensagemErro` migram de signals locais do `ItemConvidadoList` para signals no `ConvidadoState`, com métodos `abrirDialog()`, `fecharDialog()`, `confirmarCompra()`, `limparMensagem()`.

**Rationale**: O `ConvidadoState` já gerencia o ciclo de vida da tela (load, marcarCompra). Colocar o estado do diálogo lá evita duplicação e permite que `ConfirmacaoCompra` e `ItemConvidadoList` reajam aos mesmos sinais sem props complexas.

### 2. Components locais (sem lib Nx)
`Header` e `ConfirmacaoCompra` são componentes dentro de `features/convidado/components/`, sem `project.json` próprio.

**Rationale**: São específicos do módulo convidado. Nenhum outro módulo reusaria um header com "Chá de casa nova / Ariane e Lucas".

### 3. ConfirmacaoCompra injeta ConvidadoState diretamente
Não recebe `@Input()` para os valores do diálogo. Lê `state.selectedItem()`, `state.dialogState()`, `state.marcando()` e chama `state.confirmarCompra()` / `state.fecharDialog()`.

**Rationale**: O state é provido em `ConvidadoPage` e scoped ao módulo. Componentes filhos podem injetá-lo sem violar o fluxo de dados.

### 4. Confetti permanece no componente
`state.confirmarCompra()` fecha o diálogo e retorna o Observable. O componente `ConfirmacaoCompra` se inscreve para disparar confetti no `next()`.

**Rationale**: Confetti é efeito visual (DOM), não estado. O state não deve conhecer canvas-confetti.

## Risks / Trade-offs

- **Acoplamento ao state**: `ConfirmacaoCompra` depende de `ConvidadoState` diretamente. Se outro módulo quiser reusar o diálogo, precisará de um state diferente. Aceitável pois é um componente de domínio, não genérico.
- **Testes do ConfirmacaoCompra**: Como injeta o state, precisará prover um mock ou spy do state nos testes, não apenas testar com inputs.

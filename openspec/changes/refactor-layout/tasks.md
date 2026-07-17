## 1. State - Adicionar sinais de diálogo no ConvidadoState

- [x] 1.1 Adicionar signals `selectedItem`, `dialogState`, `mensagemErro` no `ConvidadoState`
- [x] 1.2 Adicionar métodos `abrirDialog()`, `fecharDialog()`, `confirmarCompra()`, `limparMensagem()`
- [x] 1.3 Ajustar `convidado.state.spec.ts` com testes dos novos sinais e métodos

## 2. Componente Header

- [x] 2.1 Criar `components/header/header.ts` com o template do header extraído de `convidado-page.html`
- [x] 2.2 Criar `components/header/header.html`
- [x] 2.3 Criar `components/header/header.spec.ts`

## 3. Componente ConfirmacaoCompra

- [x] 3.1 Criar `components/confirmacao-compra/confirmacao-compra.ts` injetando `ConvidadoState`
- [x] 3.2 Criar `components/confirmacao-compra/confirmacao-compra.html` com o `hlm-dialog`
- [x] 3.3 Botão Sim chama `state.confirmarCompra()` e dispara confetti
- [x] 3.4 Botão Não chama `state.fecharDialog()`
- [x] 3.5 Criar `components/confirmacao-compra/confirmacao-compra.spec.ts`

## 4. Simplificar ItemConvidadoList

- [x] 4.1 Remover `selectedItem`, `dialogState`, `onMarcarCompra`, `confirmarCompra`, `cancelarCompra`
- [x] 4.2 Botão "Oba, comprei este!" chama `state.abrirDialog(item)` diretamente
- [x] 4.3 Remover bloco `hlm-dialog` do template
- [x] 4.4 Renderizar `app-confirmacao-compra` no template
- [x] 4.5 Manter `hlm-alert` de `mensagemErro` lendo do state
- [x] 4.6 Ajustar `item-convidado-list.spec.ts`

## 5. Simplificar ConvidadoPage

- [x] 5.1 Substituir header inline por `<app-header/>` no template
- [x] 5.2 Atualizar imports no `convidado-page.ts`

## 6. Verificação

- [x] 6.1 Executar `npm exec nx build shared-types` (se necessário)
- [x] 6.2 Executar `npm exec nx test frontend` e corrigir falhas
- [x] 6.3 Executar `npm exec nx build frontend` e verificar build limpo

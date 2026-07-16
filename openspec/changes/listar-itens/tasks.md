## 1. Backend — Listagem de Itens (API)

- [x] 1.1 Adicionar método findAll() em items.repository.ts usando this.repo.find({ order: { id: 'DESC' } })
- [x] 1.2 Adicionar método findAll() em items.service.ts que chama o repository
- [x] 1.3 Adicionar endpoint @Get() em items.controller.ts que chama itemsService.findAll() e retorna HTTP 200
- [x] 1.4 Escrever testes unitários em items.controller.spec.ts para GET /api/items (lista cheia e lista vazia)
- [x] 1.5 Escrever testes unitários em items.service.spec.ts para findAll() (lista cheia e lista vazia)
- [x] 1.6 Verificar que npm exec nx test backend passa

## 2. Frontend — Instalação do Spartan UI Table

- [ ] 2.1 Executar `ng g @spartan-ng/cli:ui table` no diretório frontend para gerar o componente de tabela
- [ ] 2.2 Executar o health check do Spartan CLI para configurar o componente de tabela
- [ ] 2.3 Verificar que hlm-table, hlm-trow, hlm-th, hlm-td etc. estão disponíveis para importação

## 3. Frontend — Serviço de Items

- [ ] 3.1 Criar ItemsService em rontend/src/app/core/services/items.service.ts com método getAll() que faz GET /api/items e retorna IItem[]
- [ ] 3.2 Registrar ItemsService como providedIn: 'root' (standalone)

## 4. Frontend — Componente ItemList

- [ ] 4.1 Criar ItemListComponent standalone em rontend/src/app/features/gestao/item-list.ts
- [ ] 4.2 Criar template item-list.html com hlm-table + classes Tailwind, exibindo colunas: miniatura (img thumbnail com `w-10 h-10 rounded object-cover`) e nome
- [ ] 4.3 Implementar estado de carregamento (skeleton/spinner) enquanto a requisição está em andamento
- [ ] 4.4 Implementar estado vazio com mensagem "Ops, ainda não há nenhum item cadastrado."

## 5. Frontend — Integração na Página de Gestão

- [ ] 5.1 Importar ItemListComponent no gestao-page.ts
- [ ] 5.2 Atualizar gestao-page.html para renderizar <app-item-list /> abaixo do botão "Novo Item"
- [ ] 5.3 Verificar que a página compila e exibe o botão acima da lista

## 6. Frontend — Testes

- [ ] 6.1 Escrever teste em item-list.spec.ts para o estado de lista vazia (exibe mensagem)
- [ ] 6.2 Escrever teste em item-list.spec.ts para o estado de lista cheia (exibe linhas na tabela)
- [ ] 6.3 Verificar que 
pm exec nx test frontend passa

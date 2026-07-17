## ADDED Requirements

### Requirement: Convidado pode marcar item como comprado

O sistema SHALL permitir que um convidado marque um item da lista como comprado, alterando seu status de `available` para `unavailable`.

#### Scenario: Marcação bem-sucedida
- **WHEN** um convidado clica em "Oba, comprei este!" e confirma a ação
- **THEN** o sistema altera o status do item para `unavailable` E exibe animação de fogos de artifício com a mensagem "Obrigado, aguardamos sua presença dia 04/09" E remove o item da lista

#### Scenario: Item já comprado
- **WHEN** um convidado tenta marcar um item que já está com status `unavailable`
- **THEN** o sistema retorna erro 400 (Bad Request) E exibe mensagem de erro E mantém o item na lista

#### Scenario: Item inexistente
- **WHEN** um convidado tenta marcar um item que não existe
- **THEN** o sistema retorna erro 404 (Not Found)

### Requirement: Diálogo de confirmação

O sistema SHALL exibir um diálogo de confirmação antes de efetivar a marcação de compra.

#### Scenario: Confirmação aceita
- **WHEN** o convidado clica em "Sim" no diálogo de confirmação
- **THEN** o sistema chama o endpoint de marcação de compra

#### Scenario: Confirmação recusada
- **WHEN** o convidado clica em "Não" no diálogo de confirmação
- **THEN** o sistema fecha o diálogo E não executa nenhuma ação

### Requirement: Feedback visual de sucesso

O sistema SHALL exibir uma animação de fogos de artifício com uma mensagem de agradecimento quando a marcação de compra for bem-sucedida.

#### Scenario: Fogos com mensagem exibidos
- **WHEN** a requisição de marcação de compra retorna sucesso
- **THEN** o sistema executa a animação de fogos de artifício E exibe a mensagem "Obrigado, aguardamos sua presença dia 04/09" sobreposta na tela

#### Scenario: Mensagem desaparece após alguns segundos
- **WHEN** a mensagem de agradecimento é exibida
- **THEN** ela desaparece gradualmente após 4 segundos E o overlay é removido

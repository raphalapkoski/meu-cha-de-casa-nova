## ADDED Requirements

### Requirement: Build para Vercel
O sistema SHALL ser buildado no Vercel usando o preset Nx, executando `npx nx build frontend --prod` e `npx nx build backend --prod` sequencialmente.

#### Scenario: Build de produção
- **WHEN** o Vercel inicia o deploy via Git push na branch master
- **THEN** o comando de build executa e ambos os apps compilam sem erros

### Requirement: Roteamento de API
O Vercel SHALL rotear requisições `/api/*` para a serverless function do backend NestJS.

#### Scenario: Requisição de API
- **WHEN** o cliente faz uma requisição GET para `/api/items`
- **THEN** o Vercel encaminha a requisição para a serverless function do backend
- **AND** o backend processa e retorna a resposta adequada

#### Scenario: Rota não-API
- **WHEN** o cliente acessa qualquer rota que não comece com `/api/`
- **THEN** o Vercel serve o `index.html` do frontend (SPA fallback)

### Requirement: Variáveis de ambiente
O sistema SHALL usar variáveis de ambiente configuradas no Vercel Dashboard para conexão com banco de dados e outras configurações sensíveis.

#### Scenario: Conexão com banco
- **WHEN** a serverless function do backend inicia
- **THEN** ela lê DATABASE_URL da variável de ambiente configurada no Vercel
- **AND** conecta ao PostgreSQL usando TypeORM

### Requirement: Frontend como static files
O frontend Angular SHALL ser servido como arquivos estáticos no Vercel, com cache otimizado para assets com hash.

#### Scenario: Carregamento da página
- **WHEN** o cliente acessa a URL raiz da aplicação
- **THEN** o Vercel serve os arquivos estáticos do frontend (index.html, JS, CSS)
- **AND** assets com hash têm cache de longa duração

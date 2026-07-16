## Context

Monorepo Nx com três projetos: `frontend` (Angular 22, NgModules), `backend` (NestJS 11) e `shared-types` (biblioteca de tipos). Nenhum módulo de funcionalidade existe ainda. O frontend usa Vitest; o backend usa Jest. A arquitetura do backend deve seguir a estrutura modular: controller, service, domain, repository. O backend usará PostgreSQL via TypeORM com suporte a migrations.

## Goals / Non-Goals

**Goals:**
- Definir `IItem` e `CreateItemDto` em `shared-types`
- Endpoint `POST /api/items` com validação estrita (class-validator) retornando 201
- Página `/gestao` com botão "Adicionar Item" → modal de criação
- Modal com formulário: name, description, image (upload → base64); status fixo `available`
- Testes: backend valida 400 para entradas inválidas; frontend valida estado inicial dos signals

**Non-Goals:**
- Listagem, edição ou remoção de itens
- Módulo Convidado (visualizar/marcar)
- Autenticação/autorização
- Docker (PostgreSQL será configurado manualmente pelo usuário)
- Testes e2e

## Decisions

1. **Arquitetura backend modular**: `ItemsModule` com `ItemsController` → `ItemsService` → `ItemsRepository` + `ItemEntity` em `domain/`. Cada camada em pasta separada.
2. **ORM**: TypeORM com `@nestjs/typeorm`. `ItemEntity` usa decorators `@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`. Integração nativa com NestJS e decorators alinhados ao estilo do framework.
3. **DatabaseModule**: Módulo dinâmico com `TypeOrmModule.forRoot()` lendo `DATABASE_URL` de `.env`. Instalado em `AppModule`.
4. **Migrations**: TypeORM DataSource em `backend/src/app/database/ormconfig.ts` para comandos `typeorm migration:generate` e `migration:run`. Migration inicial cria a tabela `items`.
5. **Repositório**: `ItemsRepository` injeta `Repository<ItemEntity>` via `@InjectRepository()` e delega operações ao TypeORM.
6. **Validação**: `class-validator` decorators no `CreateItemDto`; `ValidationPipe` global com `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`. DTO é separado da entidade.
7. **Status fixo**: O campo `status` não é enviado no body. O backend define `'available'` automaticamente na criação.
8. **Image como base64**: Frontend lê o arquivo com `FileReader.readAsDataURL()` e envia a string base64 no JSON. Backend armazena como string na coluna `image`.
9. **Campos obrigatórios**: `name`, `description`, `image` todos `@IsNotEmpty()`.
10. **Modal + signals**: `ItemModalComponent` standalone com `signal()` para cada campo, `computed()` para `isFormValid` (name preenchido), `isSubmitting` signal.
11. **Rota `/gestao`**: Lazy loading com `loadComponent: () => import(...)` no `RouterModule`. `GestaoPageComponent` é o container com o botão que abre o modal.
12. **Testes com mock**: Repositório mockado via `@InjectRepository` nos testes — sem necessidade de PostgreSQL ou SQLite.

## Risks / Trade-offs

- **DTO duplicado**: Interface em `shared-types` e classe decorada no backend. Mitigação: a interface em shared-types é o contrato de tipo; a classe no backend estende a validação.
- **Image base64**: Ocupa mais espaço que binário. Aceito para MVP; otimização futura com upload real.
- **TypeORM acoplamento**: Entidade acoplada ao ORM. Mitigação: repositório abstrai o ORM do service; troca de ORM afeta só o repository.
- **Setup manual do PostgreSQL**: Usuário precisa ter PostgreSQL rodando e configurar `.env`. Mitigação: `.env.example` com valores padrão e instruções claras.
- **Standalone + NgModule**: Convivência até migração total. Mitigação: standalone components registrados via rota com `loadComponent`.

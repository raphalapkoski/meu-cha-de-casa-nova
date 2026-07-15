## 1. Shared Types — Contrato IItem e CreateItemDto

- [x] 1.1 Criar `shared-types/src/lib/item.ts` com interface `IItem` e tipo `CreateItemDto`
- [x] 1.2 Exportar os novos tipos em `shared-types/src/index.ts`
- [x] 1.3 Verificar build do shared-types (`npm exec nx build shared-types`)

## 2. Database Setup — PostgreSQL + TypeORM

- [ ] 2.1 Instalar `@nestjs/typeorm`, `typeorm` e `pg` no projeto
- [ ] 2.2 Criar `backend/.env` com `DATABASE_URL=postgresql://meucha:meucha@localhost:5432/meucha`
- [ ] 2.3 Criar `backend/.env.example` com o mesmo conteúdo (documentação)
- [ ] 2.4 Criar `backend/src/app/database/database.module.ts` com `TypeOrmModule.forRoot()` lendo `DATABASE_URL`
- [ ] 2.5 Criar `backend/src/app/database/ormconfig.ts` com `DataSource` para migrations CLI
- [ ] 2.6 Adicionar script `migration:generate` e `migration:run` no `package.json` do backend
- [ ] 2.7 Importar `DatabaseModule` no `AppModule`

## 3. Backend — Validação e Setup

- [ ] 3.1 Instalar `class-validator` e `class-transformer` no backend
- [ ] 3.2 Configurar `ValidationPipe` global no `main.ts` com `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`

## 4. Backend — Módulo Items

- [ ] 4.1 Criar `ItemEntity` em `backend/src/app/items/domain/item.entity.ts` com decorators TypeORM (`@Entity`, `@PrimaryGeneratedColumn`, `@Column`)
- [ ] 4.2 Criar `CreateItemDto` em `backend/src/app/items/domain/create-item.dto.ts` com validação class-validator (name, description, image obrigatórios; sem status)
- [ ] 4.3 Criar `ItemsRepository` em `backend/src/app/items/repository/items.repository.ts` com `Repository<ItemEntity>` do TypeORM via `@InjectRepository()`
- [ ] 4.4 Criar `ItemsService` em `backend/src/app/items/service/items.service.ts` com método `create(dto): ItemEntity`
- [ ] 4.5 Criar `ItemsController` em `backend/src/app/items/controller/items.controller.ts` com `POST /api/items` retornando 201
- [ ] 4.6 Criar `ItemsModule` com `TypeOrmModule.forFeature([ItemEntity])` e registrá-lo em `AppModule`
- [ ] 4.7 Gerar migration inicial (`typeorm migration:generate -n CreateItemsTable`)

## 5. Backend — Testes Unitários (Jest)

- [ ] 5.1 Criar `items.controller.spec.ts`: teste POST com dados válidos retorna 201 (repositório mockado)
- [ ] 5.2 Criar `items.controller.spec.ts`: teste POST sem name retorna 400
- [ ] 5.3 Criar `items.controller.spec.ts`: teste POST com name vazio retorna 400
- [ ] 5.4 Criar `items.controller.spec.ts`: teste POST com name > 255 chars retorna 400
- [ ] 5.5 Criar `items.controller.spec.ts`: teste POST sem description retorna 400
- [ ] 5.6 Criar `items.controller.spec.ts`: teste POST com status no body retorna 400
- [ ] 5.7 Criar `items.controller.spec.ts`: teste POST com campo extra retorna 400
- [ ] 5.8 Criar `items.service.spec.ts`: teste de criação com dados mockados
- [ ] 5.9 Verificar testes do backend (`npm exec nx test backend`)

## 6. Frontend — Página Gestão e Modal

- [x] 6.1 Criar `GestaoPageComponent` standalone (template com botão \"Adicionar Item\")
- [x] 6.2 Criar `ItemModalComponent` standalone com signals: `name`, `description`, `image`, `isSubmitting`
- [x] 6.3 Implementar `computed` `isFormValid` (name não vazio e description não vazio e image não vazio)
- [x] 6.4 Implementar upload de imagem com `FileReader.readAsDataURL()` → base64
- [x] 6.5 Implementar `onSubmit()` que chama `HttpClient.post('/api/items', payload)` e emite sucesso
- [x] 6.6 Adicionar rota `/gestao` com `loadComponent` em `app.routes.ts`

## 7. Frontend — Testes Unitários (Vitest)

- [x] 7.1 Criar `item-modal.component.spec.ts`: testar estado inicial dos signals (name '', description '', image '', isFormValid false, isSubmitting false)
- [x] 7.2 Criar `item-modal.component.spec.ts`: testar que preencher name e description torna isFormValid true
- [x] 7.3 Criar `item-modal.component.spec.ts`: testar que submit com dados válidos chama HttpClient
- [x] 7.4 Verificar testes do frontend (`npm exec nx test frontend`)

## 8. Integração e Verificação Final

- [x] 8.1 Build de todos os projetos (`npm exec nx run-many --target=build --all`)
- [x] 8.2 Rodar lint em projetos afetados (`npm exec nx run-many --target=lint --all`)
- [x] 8.3 Rodar todos os testes (`npm exec nx run-many --target=test --all`)

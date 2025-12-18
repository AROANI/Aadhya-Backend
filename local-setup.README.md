

## Setup: TypeORM, Global Interceptor, and Exception Filter

### 1. TypeORM Configuration (with `.env`)

#### Installed Packages:
```bash
pnpm add @nestjs/typeorm typeorm pg
```

#### Created `src/typeorm.config.ts`:

#### Injected TypeORM in `AppModule`:
```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

---

### 2. ⚙️ Added Global Response Interceptor

#### Created `src/common/interceptors/response.interceptor.ts`:
#### Registered in `AppModule`:
```ts
providers: [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
]
```

---

### 3. 🛡️ Added Global Exception Filter

#### Created `src/common/filters/global-exception.filter.ts`:

#### Registered in `AppModule`:
```ts
providers: [
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
]
```

---

##  Child Module Setup

This section documents the steps to create the `Child` module with entity, service, and controller using NestJS CLI and TypeORM.

---

#### 📦 1. Generate Child Module, Controller, and Service

```bash
nest generate module child
nest generate service child
nest generate controller child
```

This creates:

```
src/
  child/
    child.module.ts
    child.service.ts
    child.controller.ts
```

---

#### 🧱 2. Create CommonEntity Base Class

Create a reusable base entity to track creation, update, and soft-delete timestamps.

> 📄 File: `src/common/entities/common.entity.ts`

```ts
export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
```

---

#### 3. Define Child Entity

> 📄 File: `src/child/entities/child.entity.ts`

```ts
@Entity()
export class Child extends CommonEntity {
  @Column()
  name: string;

  @Column()
  yob: number; // year of birth
}
```

---

✅ Now you have:
- A `Child` module with service and controller scaffolded
- A reusable `CommonEntity` for consistent timestamps
- `Child` entity set up for future API and database work


## Adding the module to TypeORM and creating migrations
- There are 2 ways to do this in the `typeorm.config.ts` we can individually add the entities or provide the folder path

1. Individual entites
``` ts
const typeormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // ✅ Register entity here
  entities: [Child],
  migrations: ['dist/migrations/*{.ts,.js}'],
  
  autoLoadEntities: true,
  synchronize: false,
};
```

2. Providing folder path
``` ts
const typeormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // ✅ Register entity here
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],

  autoLoadEntities: true,
  synchronize: false,
};
```

## Migrations
#### Added migration related scripts to `package.json`

#### Generate a migration
This will create a migration file based on your entity changes.

> Make sure when running locally change the DB_PASSWORD to your local database password and host to localhost in .env file 

#### Locally:
```bash
npm run migration:generate --name=CreateChildTable
```

```bash
docker compose exec api npm migration:generate --name=CreateChildTable
```

Make sure `package.json` contains:
```json
"migration:generate": "npm run typeorm -- -d ./src/typeorm.config.ts migration:generate src/migrations/$npm_config_name"
```

#### Run the migration
This will apply all pending migrations to the Docker database.


#### Locally:
```bash
npm run migration:run
```

```bash
docker compose exec api npm migration:run
```

Make sure `package.json` contains:
```json
"migration:run": "npm run typeorm migration:run -- -d ./src/typeorm.config.ts"
```

#### Summary
| Action               | Effect                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- |
| `docker compose up`  | Starts containers, creates DB, but doesn't create tables unless migrations are run |
| `migration:generate` | Compares entity files with DB, creates `.ts` file with SQL changes                 |
| `migration:run`      | Executes migration SQL against the DB, creates tables                              |


#### Reverting a Migration (Rollback)

If you need to roll back the most recent migration:

#### Locally:
```bash
npm run migration:revert
```

#### Inside Docker container:
```bash
docker compose exec api npm run migration:revert
```

Make sure `package.json` contains:
```json
"migration:revert": "npm run typeorm -- -d ./src/typeorm.config.ts migration:revert"
```

> This will undo the last executed migration using the `down()` method defined in the migration file.


---


## Child Module API (v1)

All routes are prefixed with `/api/v1/children`.

### 🔹 Endpoints

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/`                       | List all children with pagination. Excludes soft-deleted records. |
| GET    | `/:id`                    | Get a child by ID. Excludes soft-deleted records. |
| POST   | `/`                       | Create a new child. Requires validated payload. |
| PUT    | `/:id`                    | Update an existing child. Only if not soft-deleted. |
| DELETE | `/:id`                    | Soft delete a child by setting `deletedAt` timestamp. |

### 🔸 Request/Response Format

All responses are wrapped using a global interceptor:

```json
{
  "status": 200,
  "message": "Success",
  "data": { ... },
  "stack": null
}
```

### Validations (DTO)
- `name`: Required `string`
- `yob`: Integer, must be between `1900` and current year

###  Notes
- Soft deletes are handled using the `deletedAt` field.
- All `GET` routes exclude records where `deletedAt IS NOT NULL`.
- API versioning is handled using `@Version('1')`.

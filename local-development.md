## 🧩 Notes for Local Development (Without Docker)

If you're running the NestJS backend locally (e.g. using `pnpm run start:dev`) **without Docker**, make sure to:

1. **Update DB host**:
   - Docker uses `DATABASE_HOST=db`
   - Local setup must use `DATABASE_HOST=localhost`

2. **Set the correct DB port**:
   - Default local PostgreSQL port is `5432`

3. **Create the database manually**:
   - You need to manually create the database (e.g. `aadhya_db`) in your local PostgreSQL using a tool like `psql`, `DBeaver`, or `pgAdmin`.

4. **Match your local Postgres credentials**:
   - Use your local DB username and password

You can create a `.env.local` file in your root directory for local overrides:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_local_postgres_user
DATABASE_PASSWORD=your_local_postgres_password
DATABASE_NAME=aadhya_db
```

### ⚠️ Difference Between Docker and Local DB Setup

When using **Docker**:

- The database is **automatically created** by the Postgres container on first run.
- This is controlled by `docker-compose.yml`:

```yaml
environment:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_DB: aadhya_db
```

When you run `docker compose up --build`, it automatically creates the database `aadhya_db` inside the container.

When using **local Postgres**:

- You must **manually create** the database using a tool like:

```bash
createdb -U postgres aadhya_db
```

Otherwise, you'll see an error like: `database "aadhya_db" does not exist`


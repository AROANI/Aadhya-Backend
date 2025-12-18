# Aadhya Server (NGO Backend)

This is the backend service for the Aadhya NGO project, built using [NestJS](https://nestjs.com/) and Docker.

---

## Project Setup

### Local Development

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Run the app locally

```bash
pnpm start:dev
```

The server will be available at: [http://localhost:3001](http://localhost:3001)

---

### Run with Docker

#### 1. Build and start the container

```bash
docker compose up --build
```

Then visit: [http://localhost:3001](http://localhost:3001)

#### 2. Stop the container
```bash
docker compose down
```


---

## Health Check

A simple endpoint is available to verify that the server is running:

```
GET /health
```

Example usage:

```bash
curl http://localhost:3000/health
```

Response:
```
ok
```

---

## Project Structure

```
src/
  ├── app.controller.ts   # Base and health endpoints
  ├── app.service.ts      # Application service
  └── app.module.ts       # Root module
```

---

## Tech Stack

- Node.js / NestJS
- pnpm (fast dependency management)
- Docker & Docker Compose


---

## Note for Linux Users

If you're running the app in Docker and then switching to local development using `pnpm start:dev`, you may run into permission issues like:

```
EACCES: permission denied, unlink 'dist/...'
```

This happens because the `dist/` folder is created by Docker as root.

### To fix:

```bash
sudo rm -rf dist
```

Then try running the app again:

```bash
pnpm start:dev
```

# Nishchit Frontend

Next.js App Router frontend with TypeScript, Tailwind, and shadcn/ui.

## Requirements

- Node.js 22+
- pnpm

Copy `.env.example` to `.env` and replace its placeholder values before running.

## Setup

```bash
cd frontend
cp .env.example .env
pnpm install
```

Set `NEXT_PUBLIC_API_URL` to the public URL of the backend API.

## Run locally

```bash
pnpm dev
```

App available at `http://localhost:3000`.

## Run with Docker

```bash
cd frontend
cp .env.example .env
docker compose up --build
```

The production image uses the Next.js standalone server.

## Lint, format, and type check

```bash
pnpm lint
pnpm format:check
pnpm typecheck
```

## Build

```bash
pnpm build
pnpm start
```

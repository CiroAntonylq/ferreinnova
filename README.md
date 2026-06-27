# FerreInnova

Plataforma e-commerce + panel administrativo para ferretería y materiales de construcción.

## Estructura del proyecto

```
├── frontend/         → src/, public/, configs de Vite/TS (symlinks a la raíz)
├── backend/          → supabase/ (symlink) — auth, RPC, edge functions
├── database/         → migrations/ (symlink a supabase/migrations)
├── docker/           → Dockerfile + docker-compose.yml + override
├── cypress/          → pruebas e2e
├── docs/             → documentación técnica y de negocio
├── scripts/          → scripts de automatización
├── .github/          → workflows de CI/CD
├── src/              → código React (fuente real, requerida en raíz)
├── supabase/         → migraciones + config (fuente real, requerida en raíz)
├── .env / .env.example
└── package.json
```

> Las carpetas `frontend/`, `backend/` y `database/` exponen el código vía
> **symlinks** a `src/` y `supabase/`, que deben permanecer en la raíz porque
> Lovable Cloud, Vite y la CLI de Supabase los buscan ahí. Editar un archivo
> desde cualquiera de las dos rutas modifica el mismo fichero subyacente.

## Stack

- **Frontend:** React 19 + TanStack Start + Tailwind CSS v4
- **Backend:** Lovable Cloud (Supabase) — Auth, PostgreSQL + RLS, Storage
- **Build:** Vite 7 + Bun
- **Tests:** Cypress + Vitest

## Desarrollo

```bash
bun install
bun run dev          # http://localhost:8080
```

## Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

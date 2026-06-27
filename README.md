# FerreInnova

Plataforma e-commerce + panel administrativo para ferretería y materiales de construcción.

## Estructura del proyecto

```
├── backend/          # Lógica de servidor (referencia — el código vive en src/ y supabase/)
├── frontend/         # Aplicación cliente (referencia — el código vive en src/)
├── database/         # Esquemas y migraciones (referencia — el código vive en supabase/migrations)
├── docker/           # Configuraciones de contenedores
├── cypress/          # Pruebas e2e
├── docs/             # Documentación técnica y de negocio
├── scripts/          # Scripts de automatización
├── .github/          # Workflows de CI/CD
├── docker-compose.yml
├── docker-compose.override.yml
├── .env.example
├── .gitignore
└── package.json
```

> ⚠️ Las carpetas `backend/`, `frontend/` y `database/` son **scaffolding organizativo**.
> El código real continúa en `src/` (TanStack Start + Vite) y `supabase/` para no romper
> el build ni la configuración de paths. Reubicar físicamente requeriría reconfigurar
> Vite, TanStack Router, tsconfig y Docker.

## Stack

- **Frontend:** React 19 + TanStack Start + Tailwind CSS v4
- **Backend:** Lovable Cloud (Supabase) — Auth, DB (PostgreSQL + RLS), Storage
- **Build:** Vite 7 + Bun
- **Tests:** Cypress + Vitest

## Desarrollo

```bash
bun install
bun run dev
```

La app queda disponible en `http://localhost:8080`.

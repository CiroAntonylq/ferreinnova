
# Reestructuración completa del monorepo

Mover físicamente todo el código a las carpetas `frontend/`, `backend/`, `database/`, `docker/`, `scripts/` y reconfigurar el tooling para que el build siga funcionando.

## Resultado final

```
ferreinnova/
├── frontend/
│   ├── src/                     ← todo el código React (movido desde /src)
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind / styles
│   ├── components.json
│   └── package.json             ← deps del frontend
├── backend/
│   └── supabase/
│       ├── functions/           ← edge functions (si las hay)
│       └── config.toml
├── database/
│   └── migrations/              ← movido desde supabase/migrations
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.override.yml
├── cypress/                     ← ya está
├── docs/
├── scripts/
├── .github/
├── .env
├── .env.example
├── package.json                 ← workspace raíz (bun workspaces)
└── README.md
```

## Cambios técnicos requeridos

1. **Bun workspaces** en el `package.json` raíz: `"workspaces": ["frontend"]`. Mover dependencias de React/Vite/TanStack a `frontend/package.json`. Scripts raíz delegan: `"dev": "bun --cwd frontend dev"`, `"build": "bun --cwd frontend build"`.
2. **Mover `src/` → `frontend/src/`** y `public/` → `frontend/public/`. El alias `@/*` sigue apuntando a `./src/*` (relativo a `frontend/`), así que ningún import cambia.
3. **Mover configs de Vite/TS/Tailwind/shadcn** (`vite.config.ts`, `tsconfig.json`, `components.json`, `vitest.config.ts`, `eslint.config.js`, `bunfig.toml`) a `frontend/`.
4. **`src/routeTree.gen.ts`** se regenera solo dentro de `frontend/src/` al correr el dev server — no se toca a mano.
5. **Supabase**: la CLI exige la carpeta `supabase/` en la raíz del repo. Solución: dejar `supabase/` como **symlink** a `backend/supabase/` (o al revés). Mover `supabase/migrations/` → `database/migrations/` y crear symlink `supabase/migrations` → `../database/migrations` para que `supabase db push` siga funcionando.
6. **Docker**: mover `Dockerfile` y `docker-compose*.yml` a `docker/`. Ajustar `context: ..` en compose y `COPY` paths en Dockerfile para apuntar a `frontend/`.
7. **Render / deploy**: actualizar `render.yaml` con `rootDir: frontend` y nuevo `dockerfilePath: docker/Dockerfile`.
8. **`.gitignore`, `.dockerignore`, `.prettierignore`** — ajustar rutas (`frontend/node_modules`, `frontend/.output`, etc.).
9. **Variables Vite** (`VITE_SUPABASE_URL`, etc.) siguen leyéndose desde `.env` raíz vía `envDir: '..'` en `vite.config.ts`.

## Riesgos a aceptar

- **Build temporalmente roto** durante la migración — se hace en una sola tanda de edits para minimizar la ventana.
- **Supabase CLI**: depende del symlink `supabase/` → `backend/supabase/`. En Windows sin permisos de symlink habría que mantener `supabase/` físico en raíz como excepción.
- **Lovable Cloud / preview**: la plataforma asume `src/` en la raíz para el dev server y types autogenerados (`src/integrations/supabase/types.ts`). Mover esto **puede romper la regeneración automática de tipos y el preview en vivo**. Es el riesgo más serio: si Lovable no detecta los archivos en `frontend/src/`, perderías hot-reload y types.
- **TanStack Router plugin**: necesita re-detectar `frontend/src/routes/` — se configura en el nuevo `vite.config.ts` movido.
- **Cypress baseUrl** y rutas de soporte siguen igual (ya está en `cypress/`).
- Cualquier import roto se cazaría en el primer `bun run build` post-migración.

## Pasos de ejecución (orden estricto)

1. Crear `frontend/package.json` con las deps actuales.
2. `git mv` (vía `mv`) de `src/`, `public/`, `index.html`, configs → `frontend/`.
3. Crear nuevo `package.json` raíz con workspaces y scripts de delegación.
4. Mover `Dockerfile` y compose files a `docker/`, ajustar paths.
5. Mover `supabase/migrations` → `database/migrations`, crear symlink.
6. Actualizar `render.yaml`, `.gitignore`, `.dockerignore`.
7. `bun install` en raíz.
8. Verificar: `bun run build` y `bun run dev`.
9. Si Lovable preview no engancha `frontend/src/`, revertir o documentar workaround.

## Recomendación honesta

Antes de aprobar, considera que esta reestructuración es **puramente cosmética** (mejora la lectura del repo) pero introduce fragilidad real con la plataforma Lovable y la CLI de Supabase. Si el objetivo es solo "verse profesional" en una entrega académica, el scaffolding actual con READMEs explicativos cumple sin riesgo. Si confirmas que quieres avanzar, procedo con los 9 pasos.

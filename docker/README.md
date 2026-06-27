# docker/

Carpeta organizativa creada como referencia de estructura del monorepo.
El código real de la aplicación sigue ejecutándose desde `src/` (frontend TanStack Start)
y `supabase/` (backend/migrations) para no romper el build de Vite.

Mover físicamente el código requeriría reconfigurar Vite, TanStack Router,
tsconfig paths y Docker. Por eso esta carpeta queda como placeholder.

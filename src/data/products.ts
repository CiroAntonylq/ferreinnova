// Datos simulados (mock) de productos ferreteros — mercado peruano (S/.).
// Imágenes alojadas en placehold.co (limpias, ligeras, sin CORS).

export type CategoriaSlug =
  | "pvc"
  | "herramientas"
  | "construccion"
  | "electricidad"
  | "pinturas";

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  categoriaSlug: CategoriaSlug;
  precio: number; // En soles peruanos (S/.)
  stockActual: number;
  stockMinimo: number;
  imagen: string;
}

/** URL de imagen Unsplash para cada categoría — fotografía hiperrealista. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&h=400&fit=crop&q=80`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "FERR-001",
    nombre: 'Tubo PVC SAP Eléctrico 3/4"',
    categoria: "Tuberías y Conexiones PVC",
    categoriaSlug: "pvc",
    precio: 8.5,
    stockActual: 45,
    stockMinimo: 20,
    imagen: unsplash("photo-1558354798-3699f781ac6c"),
  },
  {
    id: "FERR-002",
    nombre: "Cemento Sol Portland Tipo I (Bolsa 42.5 kg)",
    categoria: "Materiales de Construcción",
    categoriaSlug: "construccion",
    precio: 28.9,
    stockActual: 3,
    stockMinimo: 15,
    imagen: unsplash("photo-1773394089934-3e29f2a3d6a9"),
  },
  {
    id: "FERR-003",
    nombre: 'Fierro de Construcción Arequipa 1/2"',
    categoria: "Materiales de Construcción",
    categoriaSlug: "construccion",
    precio: 43.2,
    stockActual: 18,
    stockMinimo: 10,
    imagen: unsplash("photo-1763771420551-18bc44399f0c"),
  },
  {
    id: "FERR-004",
    nombre: 'Tubo PVC SAL 4" Pavco (Desagüe)',
    categoria: "Tuberías y Conexiones PVC",
    categoriaSlug: "pvc",
    precio: 34.0,
    stockActual: 12,
    stockMinimo: 8,
    imagen: unsplash("photo-1558354798-3699f781ac6c"),
  },
  {
    id: "FERR-005",
    nombre: "Martillo de Uña Tramontina 29mm",
    categoria: "Herramientas Manuales",
    categoriaSlug: "herramientas",
    precio: 24.5,
    stockActual: 25,
    stockMinimo: 5,
    imagen: unsplash("flagged/photo-1586864388090-d599b2dcc2f8"),
  },
  {
    id: "FERR-006",
    nombre: "Cable Eléctrico THW 12 AWG Indeco (m)",
    categoria: "Electricidad",
    categoriaSlug: "electricidad",
    precio: 2.8,
    stockActual: 2,
    stockMinimo: 30,
    imagen: unsplash("photo-1758965364875-e090e5423d2d"),
  },
  {
    id: "FERR-007",
    nombre: "Pintura Látex CPP Blanco Hueso 1 gal",
    categoria: "Pinturas",
    categoriaSlug: "pinturas",
    precio: 65.9,
    stockActual: 9,
    stockMinimo: 6,
    imagen: unsplash("photo-1691874076923-98ed46666dc3"),
  },
];

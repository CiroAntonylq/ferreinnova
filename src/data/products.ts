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

/** Color de fondo de la imagen según categoría — estética limpia. */
const IMG = (label: string, bg = "f1f5f9", fg = "0f172a") =>
  `https://placehold.co/600x450/${bg}/${fg}?font=roboto&text=${encodeURIComponent(label)}`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "FERR-001",
    nombre: 'Tubo PVC SAP Eléctrico 3/4"',
    categoria: "Tuberías y Conexiones PVC",
    categoriaSlug: "pvc",
    precio: 8.5,
    stockActual: 45,
    stockMinimo: 20,
    imagen: IMG("Tubo PVC SAP\n3/4\""),
  },
  {
    id: "FERR-002",
    nombre: "Cemento Sol Portland Tipo I (Bolsa 42.5 kg)",
    categoria: "Materiales de Construcción",
    categoriaSlug: "construccion",
    precio: 28.9,
    stockActual: 3,
    stockMinimo: 15,
    imagen: IMG("Cemento Sol\n42.5 kg", "fef3c7", "92400e"),
  },
  {
    id: "FERR-003",
    nombre: 'Fierro de Construcción Arequipa 1/2"',
    categoria: "Materiales de Construcción",
    categoriaSlug: "construccion",
    precio: 43.2,
    stockActual: 18,
    stockMinimo: 10,
    imagen: IMG("Fierro Aceros\nArequipa 1/2\"", "e2e8f0", "1e293b"),
  },
  {
    id: "FERR-004",
    nombre: 'Tubo PVC SAL 4" Pavco (Desagüe)',
    categoria: "Tuberías y Conexiones PVC",
    categoriaSlug: "pvc",
    precio: 34.0,
    stockActual: 12,
    stockMinimo: 8,
    imagen: IMG("Tubo PVC SAL\nPavco 4\""),
  },
  {
    id: "FERR-005",
    nombre: "Martillo de Uña Tramontina 29mm",
    categoria: "Herramientas Manuales",
    categoriaSlug: "herramientas",
    precio: 24.5,
    stockActual: 25,
    stockMinimo: 5,
    imagen: IMG("Martillo\nTramontina", "fed7aa", "7c2d12"),
  },
  {
    id: "FERR-006",
    nombre: "Cable Eléctrico THW 12 AWG Indeco (m)",
    categoria: "Electricidad",
    categoriaSlug: "electricidad",
    precio: 2.8,
    stockActual: 2,
    stockMinimo: 30,
    imagen: IMG("Cable THW\nIndeco 12 AWG", "fee2e2", "7f1d1d"),
  },
  {
    id: "FERR-007",
    nombre: "Pintura Látex CPP Blanco Hueso 1 gal",
    categoria: "Pinturas",
    categoriaSlug: "pinturas",
    precio: 65.9,
    stockActual: 9,
    stockMinimo: 6,
    imagen: IMG("Pintura CPP\n1 galón", "ede9fe", "4c1d95"),
  },
];

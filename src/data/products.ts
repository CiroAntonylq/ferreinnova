// Datos simulados (mock) de productos ferreteros.
// Reemplazable por Supabase en la siguiente fase.

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stockActual: number;
  stockMinimo: number;
  imagen?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "FERR-001",
    nombre: "Cemento Portland 50kg",
    categoria: "Construcción",
    precio: 12.5,
    stockActual: 3,
    stockMinimo: 10,
  },
  {
    id: "FERR-002",
    nombre: "Martillo de Uña 16oz",
    categoria: "Herramientas",
    precio: 8.9,
    stockActual: 25,
    stockMinimo: 5,
  },
  {
    id: "FERR-003",
    nombre: "Clavos de Acero 2'' (caja 1kg)",
    categoria: "Ferretería",
    precio: 4.2,
    stockActual: 8,
    stockMinimo: 8,
  },
  {
    id: "FERR-004",
    nombre: "Pintura Látex Blanca 1gal",
    categoria: "Pinturas",
    precio: 18.0,
    stockActual: 15,
    stockMinimo: 6,
  },
  {
    id: "FERR-005",
    nombre: "Cable Eléctrico THW 12 AWG (m)",
    categoria: "Eléctricos",
    precio: 1.1,
    stockActual: 2,
    stockMinimo: 20,
  },
];

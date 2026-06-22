import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Product } from "@/data/products";

function formatCurrency(value: number): string {
  return `S/. ${value.toFixed(2)}`;
}

function availability(stock: number, minimo: number): string {
  if (stock === 0) return "Agotado";
  if (stock <= minimo) return `Últimas ${stock}`;
  return "En stock";
}

export function downloadCatalogPDF(products: Product[]) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const now = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ── Header background
  doc.setFillColor(11, 18, 32); // #0b1220
  doc.rect(0, 0, pageWidth, 40, "F");

  // ── Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(249, 115, 22); // orange-500
  doc.text("Ferre", 14, 18);
  doc.setTextColor(125, 211, 252); // sky-300
  doc.text("Innova", 14 + doc.getTextWidth("Ferre"), 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Catálogo de materiales de construcción y ferretería", 14, 26);
  doc.setFontSize(9);
  doc.text(`Generado: ${now}`, 14, 32);

  // ── Table
  const body = products.map((p) => [
    p.id,
    p.nombre,
    p.categoria,
    formatCurrency(p.precio),
    String(p.stockActual),
    availability(p.stockActual, p.stockMinimo),
  ]);

  autoTable(doc, {
    startY: 48,
    head: [["Código", "Producto", "Categoría", "Precio", "Stock", "Disponibilidad"]],
    body,
    headStyles: {
      fillColor: [249, 115, 22],
      textColor: [2, 6, 23],
      fontStyle: "bold",
      fontSize: 10,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [30, 41, 59],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 25, halign: "center" },
      1: { cellWidth: "auto", halign: "left" },
      2: { cellWidth: 50, halign: "left" },
      3: { cellWidth: 28, halign: "right" },
      4: { cellWidth: 18, halign: "center" },
      5: { cellWidth: 30, halign: "center" },
    },
    styles: {
      lineColor: [203, 213, 225],
      lineWidth: 0.2,
    },
    margin: { top: 48, left: 12, right: 12 },
    didDrawPage: (data) => {
      // Footer
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Página ${data.pageNumber} de ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 8,
        { align: "center" },
      );
    },
  });

  doc.save("ferreinnova-catalogo.pdf");
}

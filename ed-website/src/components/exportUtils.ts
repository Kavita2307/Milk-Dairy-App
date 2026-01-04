import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* EXCEL */
export function exportToExcel(data: any[], fileName: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

/* PDF */
export function exportToPDF(headers: string[], rows: any[], title: string) {
  const doc = new jsPDF();
  doc.text(title, 14, 16);

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 22,
  });

  doc.save(`${title}.pdf`);
}

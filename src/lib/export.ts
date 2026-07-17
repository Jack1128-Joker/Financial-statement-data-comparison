import * as XLSX from 'xlsx';

export interface ExportColumn {
  header: string;
  key: string;
}

export interface ExportRow {
  [key: string]: string | number;
}

function buildSheet(rows: ExportRow[], columns: ExportColumn[]): XLSX.WorkSheet {
  const headerRow = columns.map((c) => c.header);
  const dataRows = rows.map((row) => columns.map((c) => row[c.key] ?? ''));
  const aoa = [headerRow, ...dataRows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = columns.map((c) => ({ wch: Math.max(c.header.length * 2 + 4, 16) }));
  return ws;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToExcel(
  rows: ExportRow[],
  columns: ExportColumn[],
  filename: string,
  sheetName = 'Sheet1',
) {
  const wb = XLSX.utils.book_new();
  const ws = buildSheet(rows, columns);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  triggerDownload(new Blob([buffer], { type: 'application/octet-stream' }), `${filename}.xlsx`);
}

export function exportToCsv(rows: ExportRow[], columns: ExportColumn[], filename: string) {
  const escape = (val: string | number) => {
    const str = String(val ?? '');
    if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };
  const header = columns.map((c) => escape(c.header)).join(',');
  const lines = rows.map((row) => columns.map((c) => escape(row[c.key] ?? '')).join(','));
  const csv = `\﻿${[header, ...lines].join('\n')}`;
  triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${filename}.csv`);
}

export function exportData(
  rows: ExportRow[],
  columns: ExportColumn[],
  filename: string,
  format: 'xlsx' | 'csv',
) {
  if (format === 'csv') {
    exportToCsv(rows, columns, filename);
  } else {
    exportToExcel(rows, columns, filename);
  }
}

export function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}`;
}
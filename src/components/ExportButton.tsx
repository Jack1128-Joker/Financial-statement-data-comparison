import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportData, timestamp, type ExportColumn, type ExportRow } from '@/lib/export';

interface ExportButtonProps {
  rows: ExportRow[];
  columns: ExportColumn[];
  filename: string;
  disabled?: boolean;
  sheetName?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  rows,
  columns,
  filename,
  disabled,
  sheetName,
}) => {
  const [open, setOpen] = useState(false);

  const handleExport = (format: 'xlsx' | 'csv') => {
    if (rows.length === 0) return;
    exportData(rows, columns, `${filename}_${timestamp()}`, format);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" disabled={disabled || rows.length === 0}>
          <Download className="mr-1.5 h-4 w-4" />
          导出
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('xlsx')}>
          导出为 Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          导出为 CSV (.csv)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
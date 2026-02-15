import { useState } from 'react';
import { screen, within, render } from '@testing-library/react';
import type { SortingState, ColumnDef } from '@tanstack/react-table';

import { FundsTable } from '../FundsTable';
import { TablePagination } from '../TablePagination/TablePagination';
import { ColumnHeader } from '../ColumnHeader/ColumnHeader';
import { generateDeterministicFunds } from '@/mocks/factories';
import { mapFundFromApi } from '@/domain/funds/mappers';
import type { FundTableItem } from '@/domain/funds/types';

/**
 * Columnas de test simplificadas sin RowActionsMenu
 * ya que NO testeamos las acciones de los botones (compra/venta)
 */
export const testColumns: ColumnDef<FundTableItem>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <ColumnHeader column={column} title="Categoría" />,
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => <ColumnHeader column={column} title="Moneda" />,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <ColumnHeader column={column} title="Valor" />,
  },
  {
    accessorKey: 'YTD',
    header: ({ column }) => <ColumnHeader column={column} title="2026" />,
  },
  {
    accessorKey: 'oneYear',
    header: ({ column }) => <ColumnHeader column={column} title="1A" />,
  },
  {
    accessorKey: 'threeYears',
    header: ({ column }) => <ColumnHeader column={column} title="3A" />,
  },
  {
    accessorKey: 'fiveYears',
    header: ({ column }) => <ColumnHeader column={column} title="5A" />,
  },
];

/**
 * Props para el wrapper de integración
 */
export interface FundsTableIntegrationProps {
  initialData: FundTableItem[];
  pageSize?: number;
}

/**
 * Wrapper component que integra FundsTable con paginación y ordenación
 * para simular el comportamiento real del componente en la página Funds
 */
export const FundsTableIntegration = ({
  initialData,
  pageSize = 10,
}: FundsTableIntegrationProps) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  const totalPages = Math.ceil(initialData.length / pageSize);

  // Aplicar ordenación
  const getSortedData = () => {
    const data = [...initialData];
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      data.sort((a, b) => {
        const aValue = a[id as keyof FundTableItem];
        const bValue = b[id as keyof FundTableItem];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return desc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return desc ? bValue - aValue : aValue - bValue;
        }
        return 0;
      });
    }
    return data;
  };
  const sortedData = getSortedData();

  // Aplicar paginación
  const startIndex = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const pagination = totalPages > 1 ? { page, totalPages } : undefined;

  return (
    <div>
      <FundsTable
        columns={testColumns}
        data={paginatedData}
        sorting={sorting}
        handleSorting={setSorting}
      />
      <TablePagination pagination={pagination} setPage={setPage} />
    </div>
  );
};

/**
 * Helper para generar datos de test mapeados
 */
export const generateTestFunds = (count: number): FundTableItem[] => {
  const apiFunds = generateDeterministicFunds(count);
  return apiFunds.map(mapFundFromApi);
};

/**
 * Helper para renderizar el componente de integración
 */
export const renderFundsTable = (funds: FundTableItem[], pageSize = 10) => {
  return render(<FundsTableIntegration initialData={funds} pageSize={pageSize} />);
};

/**
 * Helper para obtener el nombre del primer fondo en la tabla
 */
export const getFirstCellName = (): string | null => {
  const dataRows = screen.getAllByRole('row').slice(1);
  const firstRow = dataRows[0];
  const cells = within(firstRow).getAllByRole('cell');
  return cells[0].textContent;
};

/**
 * Helper para obtener todos los nombres de fondos en el orden actual
 */
export const getAllFundNames = (): (string | null)[] => {
  const dataRows = screen.getAllByRole('row').slice(1);
  return dataRows.map((row) => within(row).getAllByRole('cell')[0].textContent);
};

/**
 * Helper para obtener el botón de ordenación de una columna
 */
export const getSortButtonForColumn = (columnName: RegExp) => {
  const header = screen.getByRole('columnheader', { name: columnName });
  return within(header).getByRole('button');
};

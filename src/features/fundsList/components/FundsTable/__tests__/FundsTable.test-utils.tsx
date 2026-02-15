import { useState } from 'react';
import { screen, within, render } from '@testing-library/react';
import type { SortingState } from '@tanstack/react-table';

import { FundsTable } from '../FundsTable';
import { TablePagination } from '../TablePagination/TablePagination';
import { generateDeterministicFunds } from '@/mocks/factories';
import { mapFundFromApi } from '@/domain/funds/mappers';
import type { FundTableItem } from '@/domain/funds/types';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';

export interface FundsTableIntegrationProps {
  initialData: FundTableItem[];
  pageSize?: number;
}

export const FundsTableIntegration = ({
  initialData,
  pageSize = 10,
}: FundsTableIntegrationProps) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  const totalPages = Math.ceil(initialData.length / pageSize);

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

  const startIndex = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const pagination = totalPages > 1 ? { page, totalPages } : undefined;

  return (
    <FundActionDialogProvider>
      <div>
        <FundsTable data={paginatedData} sorting={sorting} handleSorting={setSorting} />
        <TablePagination pagination={pagination} setPage={setPage} />
      </div>
    </FundActionDialogProvider>
  );
};

export const generateTestFunds = (count: number): FundTableItem[] => {
  const apiFunds = generateDeterministicFunds(count);
  return apiFunds.map(mapFundFromApi);
};

export const renderFundsTable = (funds: FundTableItem[], pageSize = 10) => {
  return render(<FundsTableIntegration initialData={funds} pageSize={pageSize} />);
};

export const getFirstCellName = (): string | null => {
  const dataRows = screen.getAllByRole('row').slice(1);
  const firstRow = dataRows[0];
  const cells = within(firstRow).getAllByRole('cell');
  return cells[0].textContent;
};

export const getAllFundNames = (): (string | null)[] => {
  const dataRows = screen.getAllByRole('row').slice(1);
  return dataRows.map((row) => within(row).getAllByRole('cell')[0].textContent);
};

export const getSortButtonForColumn = (columnName: RegExp) => {
  const header = screen.getByRole('columnheader', { name: columnName });
  return within(header).getByRole('button');
};

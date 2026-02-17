import { useMemo } from 'react';
import { RowActionsMenu } from '@features/fundsList/components/FundsTable/RowActionsMenu/RowActionsMenu';
import { ColumnHeader } from '@features/fundsList/components/FundsTable/ColumnHeader/ColumnHeader';
import { getProfitabilityColor } from '@lib/utils/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { Fund } from '@domain/fund';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const useColumns = (): ColumnDef<Fund>[] => {
  return useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <ColumnHeader column={column} title="Nombre" />,
        cell: ({ row }) => {
          return <span className="font-bold">{row.original.name}</span>;
        },
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
        cell: ({ row }) => {
          const value = row.original.YTD;
          return <span className={getProfitabilityColor(value)}>{`${value} %`}</span>;
        },
      },
      {
        accessorKey: 'oneYear',
        header: ({ column }) => <ColumnHeader column={column} title="1A" />,
        cell: ({ row }) => {
          const value = row.original.oneYear;
          return <span className={getProfitabilityColor(value)}>{`${value} %`}</span>;
        },
      },
      {
        accessorKey: 'threeYears',
        header: ({ column }) => <ColumnHeader column={column} title="3A" />,
        cell: ({ row }) => {
          const value = row.original.threeYears;
          return <span className={getProfitabilityColor(value)}>{`${value} %`}</span>;
        },
      },
      {
        accessorKey: 'fiveYears',
        header: ({ column }) => <ColumnHeader column={column} title="5A" />,
        cell: ({ row }) => {
          const value = row.original.fiveYears;
          return <span className={getProfitabilityColor(value)}>{`${value} %`}</span>;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => <RowActionsMenu data={row} />,
      },
    ],
    []
  );
};

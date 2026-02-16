import { useMemo } from 'react';
import { RowActionsMenu } from '@features/fundsList/components/FundsTable/RowActionsMenu/RowActionsMenu';
import { ColumnHeader } from '@features/fundsList/components/FundsTable/ColumnHeader';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const useColumns = () => {
  return useMemo(
    () => [
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
      {
        id: 'actions',
        cell: ({ row }) => <RowActionsMenu data={row} />,
      },
    ],
    []
  );
};

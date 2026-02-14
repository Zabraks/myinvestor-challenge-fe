import { useState } from 'react';
import { useColumns } from '@/features/fundsList/components/FundsTable/columns';
import { FundsTable } from '@features/fundsList/components/FundsTable/FundsTable';
import { LimitPageSelector } from '@features/fundsList/components/FundsTable/LimitPageSelector';
import { TablePagination } from '@features/fundsList/components/FundsTable/TablePagination';
import { useFundsList } from '@features/fundsList/queries/useFundsList';

import type { SortingState } from '@tanstack/react-table';

const Funds = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useColumns();

  const { data: response } = useFundsList({
    page,
    limit,
    sorting,
  });

  const { pagination, data } = response || {};

  return (
    <div className="flex flex-col justify-between gap-3 overflow-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Lista de fondos</h2>
        <LimitPageSelector setPage={setPage} setLimit={setLimit} />
      </div>
      <FundsTable
        columns={columns}
        data={data || []}
        sorting={sorting}
        handleSorting={setSorting}
      />
      <TablePagination setPage={setPage} pagination={pagination} />
    </div>
  );
};

export default Funds;

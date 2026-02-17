import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { SortingState } from '@tanstack/react-table';
import { getFunds } from '@services/fund';
import { adaptSorting } from '@lib/adapters/sorting';

interface UseFundsListParams {
  page: number;
  limit: number;
  sorting: SortingState;
}

export const useFundsList = ({ page, limit, sorting }: UseFundsListParams) => {
  const backendSort = adaptSorting(sorting);

  return useQuery({
    queryKey: ['FundsList', page, limit, backendSort?.field, backendSort?.direction],
    queryFn: () => getFunds(page, limit, backendSort?.field, backendSort?.direction),
    placeholderData: keepPreviousData,
  });
};

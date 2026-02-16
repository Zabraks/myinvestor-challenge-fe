import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getFunds } from '@services/funds/getFunds.api';
import { adaptSorting } from '@lib/adapters/sorting';

export const useFundsList = ({ page, limit, sorting }) => {
  const backendSort = adaptSorting(sorting);

  return useQuery({
    queryKey: ['FundsList', page, limit, backendSort?.field, backendSort?.direction],
    queryFn: () => getFunds(page, limit, backendSort?.field, backendSort?.direction),
    placeholderData: keepPreviousData,
  });
};

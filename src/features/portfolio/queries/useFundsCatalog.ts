import { useQuery } from '@tanstack/react-query';
import { getAllFunds } from '@services/funds/getAllFunds.api';
import type { FundTableItem } from '@domain/funds/types';

export function useFundsCatalog() {
  return useQuery<FundTableItem[]>({
    queryKey: ['funds', 'catalog'],
    queryFn: getAllFunds,
    staleTime: Infinity,
  });
}

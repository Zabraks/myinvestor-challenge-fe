import { useQuery } from '@tanstack/react-query';
import { getAllFunds } from '@services/fund';
import type { Fund } from '@domain/fund';

export function useFundsCatalog() {
  return useQuery<Fund[]>({
    queryKey: ['funds', 'catalog'],
    queryFn: getAllFunds,
    staleTime: Infinity,
  });
}

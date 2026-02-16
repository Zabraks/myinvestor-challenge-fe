import { useQuery } from '@tanstack/react-query';
import { getFundById } from '@services/fund';
import type { Fund } from '@domain/fund';

interface UseFundDetailsParams {
  fundId: string;
  initialData?: Fund;
}

export function useFundDetails({ fundId, initialData }: UseFundDetailsParams) {
  return useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => getFundById(fundId),
    enabled: !initialData,
    initialData,
    //TODO: establecer politica de caches
    staleTime: 5 * 60 * 1000,
  });
}

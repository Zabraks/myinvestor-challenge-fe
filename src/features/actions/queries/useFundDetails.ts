import { useQuery } from '@tanstack/react-query';
import { getFundById } from '@services/funds/getFundById.api';
import type { FundTableItem } from '@domain/funds/types';

interface UseFundDetailsParams {
  fundId: string;
  initialData?: FundTableItem;
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

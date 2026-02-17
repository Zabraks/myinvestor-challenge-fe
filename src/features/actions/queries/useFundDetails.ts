import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFundById } from '@services/fund';
import type { Fund } from '@domain/fund';

interface UseFundDetailsParams {
  fundId: string;
  initialData?: Fund;
}

export function useFundDetails({ fundId }: UseFundDetailsParams) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => getFundById(fundId),
    initialData: () => {
      const allFunds = queryClient.getQueryData<Fund[]>(['funds']);
      return allFunds?.find((fund) => fund.id === fundId);
    },
    staleTime: 5 * 60 * 1000,
  });
}

import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '@services/portfolio';
import type { Portfolio } from '@domain/portfolio';

export const usePortfolio = () =>
  useQuery<Portfolio>({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 0,
  });

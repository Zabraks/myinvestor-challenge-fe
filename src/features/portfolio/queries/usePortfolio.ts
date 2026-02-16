import { useQuery } from '@tanstack/react-query';
import { getPortfolioApi } from '@services/portfolio/getPortfolio.api';
import type { PortfolioResponseDto } from '@/services/portfolio/portfolio.dto';

export const usePortfolio = () =>
  useQuery<PortfolioResponseDto>({
    queryKey: ['portfolio'],
    queryFn: getPortfolioApi,
  });

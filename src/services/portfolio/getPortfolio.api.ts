import type { PortfolioResponseDto } from './portfolio.dto';
import { mapPortfolioFromApi } from '@/domain/portfolio/mappers';

export const getPortfolioApi = async () => {
  const res = await fetch('http://localhost:3000/portfolio');

  if (!res.ok) {
    throw new Error('Error fetching portfolio');
  }

  const data = (await res.json()) as PortfolioResponseDto;

  return mapPortfolioFromApi(data);
};

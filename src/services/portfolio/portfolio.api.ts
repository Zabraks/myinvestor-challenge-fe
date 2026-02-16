import type { Portfolio } from '@domain/portfolio';
import { mapPortfolioFromApi } from '@domain/portfolio';
import type { PortfolioResponseDto } from './portfolio.types';

const API_BASE = 'http://localhost:3000';

export async function getPortfolio(): Promise<Portfolio> {
  const res = await fetch(`${API_BASE}/portfolio`);
  if (!res.ok) throw new Error('Error fetching portfolio');

  const data = (await res.json()) as PortfolioResponseDto;

  return mapPortfolioFromApi(data);
}

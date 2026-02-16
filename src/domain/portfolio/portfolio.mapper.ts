import type { Portfolio, PortfolioItem } from './portfolio.types';
import type { PortfolioItemDto, PortfolioResponseDto } from '@services/portfolio';

export function mapPortfolioFromApi(response: PortfolioResponseDto): Portfolio {
  return {
    items: response.data.map(
      (item: PortfolioItemDto): PortfolioItem => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        totalValue: item.totalValue,
      })
    ),
  };
}

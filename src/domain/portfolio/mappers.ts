import type { Portfolio, PortfolioItemType } from '@domain/portfolio/models';
import type { PortfolioResponseDto } from '@services/portfolio/portfolio.dto';

export const mapPortfolioFromApi = (portfolio: PortfolioResponseDto): Portfolio => ({
  items: portfolio.data.map<PortfolioItemType>((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    totalValue: item.totalValue,
  })),
});

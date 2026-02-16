import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import type { PortfolioItemDto, PortfolioResponseDto } from '@services/portfolio';
import type { Category } from '@domain/fund';

const CATEGORIES: Category[] = ['GLOBAL', 'TECH', 'HEALTH', 'MONEY_MARKET'];
const FUND_NAME_SUFFIXES = ['Fund', 'ETF', 'Index', 'Growth', 'Income'];

export const portfolioItemFactory = Factory.define<PortfolioItemDto>(({ sequence }) => ({
  id: `fund-${String(sequence).padStart(3, '0')}`,
  name: `${faker.company.name()} ${faker.helpers.arrayElement(FUND_NAME_SUFFIXES)}`,
  quantity: faker.number.int({ min: 10, max: 500 }),
  totalValue: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
}));

export function generatePortfolioWithCategories(
  itemsPerCategory = 2,
  seed = 12345
): PortfolioResponseDto {
  faker.seed(seed);

  const items: PortfolioItemDto[] = [];

  CATEGORIES.forEach((category, categoryIndex) => {
    for (let i = 0; i < itemsPerCategory; i++) {
      const globalIndex = categoryIndex * itemsPerCategory + i;
      items.push(
        portfolioItemFactory.build({
          id: `fund-${String(globalIndex + 1).padStart(3, '0')}`,
          name: `${category} ${faker.company.name()} ${faker.helpers.arrayElement(FUND_NAME_SUFFIXES)}`,
        })
      );
    }
  });

  faker.seed();
  return { data: items };
}

export function generateEmptyPortfolio(): PortfolioResponseDto {
  return { data: [] };
}

export function generatePortfolioResponse(items: PortfolioItemDto[]): PortfolioResponseDto {
  return { data: items };
}

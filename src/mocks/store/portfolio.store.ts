import { faker } from '@faker-js/faker';
import type { PortfolioItemDto } from '@services/portfolio';
import type { Category } from '@domain/fund';
import { generateDeterministicFunds } from '@mocks/factories';

const CATEGORIES: Category[] = ['GLOBAL', 'TECH', 'HEALTH', 'MONEY_MARKET'];
const FUND_NAME_SUFFIXES = ['Fund', 'ETF', 'Index', 'Growth', 'Income'];

let portfolioItems: PortfolioItemDto[] = [];

function generateInitialPortfolio(seed = 12345): PortfolioItemDto[] {
  faker.seed(seed);

  const items: PortfolioItemDto[] = [];
  const funds = generateDeterministicFunds(25);

  CATEGORIES.forEach((category, categoryIndex) => {
    for (let i = 0; i < 2; i++) {
      const fundIndex = categoryIndex * 2 + i;
      const fund = funds[fundIndex];

      if (fund) {
        items.push({
          id: fund.id,
          name: `${category} ${faker.company.name()} ${faker.helpers.arrayElement(FUND_NAME_SUFFIXES)}`,
          quantity: faker.number.int({ min: 10, max: 500 }),
          totalValue: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
        });
      }
    }
  });

  faker.seed();
  return items;
}

portfolioItems = generateInitialPortfolio();

export function getPortfolioItems(): PortfolioItemDto[] {
  return [...portfolioItems];
}

export function resetPortfolioStore(): void {
  portfolioItems = generateInitialPortfolio();
}

export function buyFund(fundId: string, fundName: string, quantity: number): void {
  const existingItem = portfolioItems.find((item) => item.id === fundId);

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.totalValue += quantity * 100;
  } else {
    portfolioItems.push({
      id: fundId,
      name: fundName,
      quantity,
      totalValue: quantity * 100,
    });
  }
}

export function sellFund(fundId: string, quantity: number): void {
  const existingItem = portfolioItems.find((item) => item.id === fundId);

  if (existingItem) {
    existingItem.quantity -= quantity;
    existingItem.totalValue -= quantity * 100;

    if (existingItem.quantity <= 0) {
      portfolioItems = portfolioItems.filter((item) => item.id !== fundId);
    }
  }
}

export function transferFund(
  fromFundId: string,
  toFundId: string,
  toFundName: string,
  quantity: number
): void {
  sellFund(fromFundId, quantity);

  buyFund(toFundId, toFundName, quantity);
}

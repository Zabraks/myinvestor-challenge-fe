import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import type { ApiFund, Category, Currency } from '@domain/funds/types';

const CATEGORIES: Category[] = ['GLOBAL', 'TECH', 'HEALTH', 'MONEY_MARKET'];
const CURRENCIES: Currency[] = ['USD', 'EUR'];
const FUND_NAME_SUFFIXES = ['Fund', 'ETF', 'Index', 'Growth', 'Income', 'Capital'];

const DEFAULT_RANGES = {
  YTD: { min: -5, max: 15 },
  oneYear: { min: -10, max: 25 },
  threeYears: { min: -15, max: 45 },
  fiveYears: { min: -20, max: 80 },
};

export const fundFactory = Factory.define<ApiFund>(({ sequence }) => ({
  id: `fund-${String(sequence).padStart(3, '0')}`,
  name: `${faker.company.name()} ${faker.helpers.arrayElement(FUND_NAME_SUFFIXES)}`,
  category: faker.helpers.arrayElement(CATEGORIES),
  currency: faker.helpers.arrayElement(CURRENCIES),
  value: faker.number.float({ min: 5000, max: 150000, fractionDigits: 2 }),
  symbol: faker.string.alpha({ length: 3, casing: 'upper' }),
  profitability: {
    YTD: faker.number.float({ ...DEFAULT_RANGES.YTD, fractionDigits: 2 }),
    oneYear: faker.number.float({ ...DEFAULT_RANGES.oneYear, fractionDigits: 2 }),
    threeYears: faker.number.float({ ...DEFAULT_RANGES.threeYears, fractionDigits: 2 }),
    fiveYears: faker.number.float({ ...DEFAULT_RANGES.fiveYears, fractionDigits: 2 }),
  },
}));

export const generateDeterministicFunds = (count: number, seed = 12345): ApiFund[] => {
  faker.seed(seed);
  const funds = fundFactory.buildList(count);
  faker.seed();
  return funds;
};

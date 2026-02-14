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

/**
 * Factory para generar fondos de inversión con datos realistas.
 *
 * @example
 * // Generar un fondo aleatorio
 * const fund = fundFactory.build();
 *
 * @example
 * // Generar múltiples fondos
 * const funds = fundFactory.buildList(10);
 *
 * @example
 * // Generar con valores específicos (override)
 * const techFund = fundFactory.build({ category: 'TECH', currency: 'USD' });
 */
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

/**
 * Genera una lista de fondos con seed fijo para tests determinísticos.
 * Útil para snapshots y tests que requieren datos consistentes.
 */
export const generateDeterministicFunds = (count: number, seed = 12345): ApiFund[] => {
  faker.seed(seed);
  const funds = fundFactory.buildList(count);
  faker.seed(); // Reset seed
  return funds;
};

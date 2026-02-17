import type { Category, ProfitabilityField } from './fund.types';

export const CATEGORY_LABELS = {
  GLOBAL: 'Global',
  TECH: 'Tecnología',
  HEALTH: 'Salud',
  MONEY_MARKET: 'Monetarios',
} as const satisfies Record<Category, string>;

export type CategoryKey = Category;
export type CategoryLabel = (typeof CATEGORY_LABELS)[keyof typeof CATEGORY_LABELS];

export const PROFITABILITY_FIELDS: readonly ProfitabilityField[] = [
  'YTD',
  'oneYear',
  'threeYears',
  'fiveYears',
] as const;

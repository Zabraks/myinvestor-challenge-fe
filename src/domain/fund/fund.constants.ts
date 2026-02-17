import type { Category } from './fund.types';

export const CATEGORY_LABELS = {
  GLOBAL: 'Global',
  TECH: 'Tecnología',
  HEALTH: 'Salud',
  MONEY_MARKET: 'Monetarios',
} as const satisfies Record<Category, string>;

export type CategoryKey = Category;
export type CategoryLabel = (typeof CATEGORY_LABELS)[keyof typeof CATEGORY_LABELS];

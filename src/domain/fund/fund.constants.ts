import type { Category } from './fund.types';

export const CATEGORY_LABELS: Record<Category, string> = {
  GLOBAL: 'Global',
  TECH: 'Tecnología',
  HEALTH: 'Salud',
  MONEY_MARKET: 'Monetarios',
};

export type CategoryKey = Category;

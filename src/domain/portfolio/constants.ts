export const CATEGORY_LABELS = {
  GLOBAL: 'Global',
  TECH: 'Tecnología',
  HEALTH: 'Salud',
  MONEY_MARKET: 'Monetarios',
} as const;

export type CategoryKey = keyof typeof CATEGORY_LABELS;

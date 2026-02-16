import type { CategoryGroup } from './portfolio.types';

export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
}

export function groupByCategory<T extends { category: string }>(items: T[]): CategoryGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  return Array.from(groups, ([nameCategory, items]) => ({ nameCategory, items }));
}

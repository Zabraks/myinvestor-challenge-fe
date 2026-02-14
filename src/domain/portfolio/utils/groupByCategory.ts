export interface CategoryGroup<T> {
  nameCategory: string;
  items: T[];
}

export function groupByCategory<T extends { category: string }>(
  items: readonly T[]
): CategoryGroup<T>[] {
  const map = new Map<string, T[]>();

  for (const item of items) {
    if (!map.has(item.category)) {
      map.set(item.category, []);
    }
    map.get(item.category)?.push(item);
  }

  return Array.from(map.entries()).map(([name, items]) => ({
    nameCategory: name,
    items,
  }));
}

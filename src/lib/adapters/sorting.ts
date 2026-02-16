import type { SortingState } from '@tanstack/react-table';
import type { BackendSort } from '@domain/fund';

export function adaptSorting(sorting: SortingState): BackendSort | undefined {
  const sort = sorting?.length && sorting[0];

  if (!sort) return undefined;

  return {
    field: sort.id,
    direction: sort.desc ? 'desc' : 'asc',
  };
}

import type { SortingState } from '@tanstack/react-table';
import type { BackendSort, ProfitabilityField } from '@domain/fund';
import { PROFITABILITY_FIELDS } from '@domain/fund';

function isProfitabilityField(field: string): field is ProfitabilityField {
  return (PROFITABILITY_FIELDS as readonly string[]).includes(field);
}

function mapFieldToApi(field: string): string {
  if (isProfitabilityField(field)) {
    return `profitability.${field}`;
  }
  return field;
}

export function adaptSorting(sorting: SortingState): BackendSort | undefined {
  const sort = sorting?.length && sorting[0];

  if (!sort) return undefined;

  return {
    field: mapFieldToApi(sort.id),
    direction: sort.desc ? 'desc' : 'asc',
  };
}

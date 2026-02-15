export type SortDirection = 'asc' | 'desc';

export interface BackendSort {
  field: string;
  direction: SortDirection;
}

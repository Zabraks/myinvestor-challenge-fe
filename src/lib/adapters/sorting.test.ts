import { describe, it, expect } from 'vitest';
import { adaptSorting } from './sorting';
import type { SortingState } from '@tanstack/react-table';

describe('adaptSorting', () => {
  describe('when sorting is empty', () => {
    it('should return undefined for empty array', () => {
      const sorting: SortingState = [];

      const result = adaptSorting(sorting);

      expect(result).toBeUndefined();
    });

    it('should return undefined for null-ish sorting', () => {
      const result = adaptSorting([] as SortingState);

      expect(result).toBeUndefined();
    });
  });

  describe('when sorting has ascending order', () => {
    it('should adapt single column ascending sort', () => {
      const sorting: SortingState = [{ id: 'name', desc: false }];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'name',
        direction: 'asc',
      });
    });

    it('should adapt numeric column ascending sort', () => {
      const sorting: SortingState = [{ id: 'value', desc: false }];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'value',
        direction: 'asc',
      });
    });
  });

  describe('when sorting has descending order', () => {
    it('should adapt single column descending sort', () => {
      const sorting: SortingState = [{ id: 'name', desc: true }];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'name',
        direction: 'desc',
      });
    });

    it('should adapt profitability column descending sort', () => {
      const sorting: SortingState = [{ id: 'YTD', desc: true }];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'YTD',
        direction: 'desc',
      });
    });
  });

  describe('when sorting has multiple columns', () => {
    it('should only use the first sort criteria', () => {
      const sorting: SortingState = [
        { id: 'name', desc: false },
        { id: 'value', desc: true },
      ];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'name',
        direction: 'asc',
      });
    });

    it('should ignore secondary sort even with different directions', () => {
      const sorting: SortingState = [
        { id: 'category', desc: true },
        { id: 'name', desc: false },
        { id: 'value', desc: true },
      ];

      const result = adaptSorting(sorting);

      expect(result).toEqual({
        field: 'category',
        direction: 'desc',
      });
    });
  });

  describe('field name preservation', () => {
    it('should preserve exact field names with camelCase', () => {
      const sorting: SortingState = [{ id: 'threeYears', desc: false }];

      const result = adaptSorting(sorting);

      expect(result?.field).toBe('threeYears');
    });

    it('should preserve exact field names with special characters', () => {
      const sorting: SortingState = [{ id: 'column_name', desc: false }];

      const result = adaptSorting(sorting);

      expect(result?.field).toBe('column_name');
    });
  });

  describe('type safety', () => {
    it('should return BackendSort type with correct shape', () => {
      const sorting: SortingState = [{ id: 'value', desc: true }];

      const result = adaptSorting(sorting);

      expect(result).toHaveProperty('field');
      expect(result).toHaveProperty('direction');
      expect(typeof result?.field).toBe('string');
      expect(['asc', 'desc']).toContain(result?.direction);
    });
  });
});

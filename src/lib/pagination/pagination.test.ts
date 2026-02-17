import { describe, it, expect } from 'vitest';
import { getVisiblePages } from './pagination';

describe('getVisiblePages', () => {
  describe('with default maxVisiblePages (5)', () => {
    it('should return all pages when totalPages <= maxVisiblePages', () => {
      const result = getVisiblePages(1, 3);

      expect(result).toEqual([1, 2, 3]);
    });

    it('should return first 5 pages when on page 1', () => {
      const result = getVisiblePages(1, 10);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return first 5 pages when on page 2', () => {
      const result = getVisiblePages(2, 10);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return first 5 pages when on page 3 (half + 1)', () => {
      const result = getVisiblePages(3, 10);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should center pages around current page in the middle', () => {
      const result = getVisiblePages(5, 10);

      expect(result).toEqual([3, 4, 5, 6, 7]);
    });

    it('should return last 5 pages when near the end', () => {
      const result = getVisiblePages(9, 10);

      expect(result).toEqual([6, 7, 8, 9, 10]);
    });

    it('should return last 5 pages when on the last page', () => {
      const result = getVisiblePages(10, 10);

      expect(result).toEqual([6, 7, 8, 9, 10]);
    });
  });

  describe('with custom maxVisiblePages', () => {
    it('should respect maxVisiblePages of 3', () => {
      const result = getVisiblePages(5, 10, 3);

      expect(result).toEqual([4, 5, 6]);
    });

    it('should respect maxVisiblePages of 7', () => {
      const result = getVisiblePages(5, 10, 7);

      expect(result).toEqual([2, 3, 4, 5, 6, 7, 8]);
    });

    it('should not exceed totalPages with large maxVisiblePages', () => {
      const result = getVisiblePages(1, 5, 10);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('edge cases', () => {
    it('should handle single page', () => {
      const result = getVisiblePages(1, 1);

      expect(result).toEqual([1]);
    });

    it('should handle two pages on first page', () => {
      const result = getVisiblePages(1, 2);

      expect(result).toEqual([1, 2]);
    });

    it('should handle two pages on second page', () => {
      const result = getVisiblePages(2, 2);

      expect(result).toEqual([1, 2]);
    });

    it('should handle exactly 5 pages (equal to maxVisiblePages)', () => {
      const result = getVisiblePages(3, 5);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return correct pages when on page 4 of 10', () => {
      const result = getVisiblePages(4, 10);

      expect(result).toEqual([2, 3, 4, 5, 6]);
    });

    it('should return correct pages when on page 6 of 10', () => {
      const result = getVisiblePages(6, 10);

      expect(result).toEqual([4, 5, 6, 7, 8]);
    });

    it('should return correct pages when on page 7 of 10', () => {
      const result = getVisiblePages(7, 10);

      expect(result).toEqual([5, 6, 7, 8, 9]);
    });

    it('should return correct pages when on page 8 of 10 (near end)', () => {
      const result = getVisiblePages(8, 10);

      expect(result).toEqual([6, 7, 8, 9, 10]);
    });
  });

  describe('boundary conditions', () => {
    it('should always include currentPage in result', () => {
      for (let page = 1; page <= 20; page++) {
        const result = getVisiblePages(page, 20);
        expect(result).toContain(page);
      }
    });

    it('should never return pages less than 1', () => {
      const result = getVisiblePages(1, 100);

      expect(Math.min(...result)).toBeGreaterThanOrEqual(1);
    });

    it('should never return pages greater than totalPages', () => {
      const result = getVisiblePages(100, 100);

      expect(Math.max(...result)).toBeLessThanOrEqual(100);
    });

    it('should return consecutive numbers', () => {
      const result = getVisiblePages(5, 10);

      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBe(result[i - 1] + 1);
      }
    });
  });
});

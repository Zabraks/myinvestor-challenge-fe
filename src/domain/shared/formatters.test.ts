import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
  it('should format value to correct standard positive number correctly', () => {
    const value = 1701.68;

    const result = formatCurrency(value);

    expect(result).toMatch(/1\.?701,68\s€/);
  });

  it('It should be rounded up to 2 decimal places.', () => {
    expect(formatCurrency(10.556)).toMatch(/10,56\s€/);
  });

  it('You should round down to 2 decimal places.', () => {
    expect(formatCurrency(10.554)).toMatch(/10,55\s€/);
  });

  it('should handle zero value', () => {
    expect(formatCurrency(0)).toMatch(/0,00\s€/);
  });

  it('should format large numbers with proper thousand separators', () => {
    expect(formatCurrency(1000000)).toMatch(/1\.000\.000,00\s€/);
  });
});

import { describe, it, expect } from 'vitest';
import { getCoin, getProfitabilityColor } from './utils';

describe('getCoin', () => {
  it('should return € when value is EUR', () => {
    expect(getCoin('EUR')).toBe('€');
  });

  it('should return $ when value is USD', () => {
    expect(getCoin('USD')).toBe('$');
  });
});

describe('getProfitabilityColor', () => {
  it('should return text-green-600 for positive values', () => {
    expect(getProfitabilityColor(5.5)).toBe('text-green-600');
    expect(getProfitabilityColor(0.01)).toBe('text-green-600');
    expect(getProfitabilityColor(100)).toBe('text-green-600');
  });

  it('should return text-red-600 for negative values', () => {
    expect(getProfitabilityColor(-5.5)).toBe('text-red-600');
    expect(getProfitabilityColor(-0.01)).toBe('text-red-600');
    expect(getProfitabilityColor(-100)).toBe('text-red-600');
  });

  it('should return empty string when value is zero', () => {
    expect(getProfitabilityColor(0)).toBe('');
  });
});

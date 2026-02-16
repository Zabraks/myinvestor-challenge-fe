import { describe, it, expect } from 'vitest';
import { getCoin } from './utils';

describe('getCoin', () => {
  it('devuelve € para EUR', () => {
    expect(getCoin('EUR')).toBe('€');
  });

  it('devuelve $ para USD', () => {
    expect(getCoin('USD')).toBe('$');
  });
});

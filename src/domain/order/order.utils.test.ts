import { describe, it, expect } from 'vitest';
import { getOrderTypeLabel, getOrderTypeTone, getOrderSign, formatDate } from './order.utils';
import type { OrderType } from './order.types';

describe('getOrderTypeLabel', () => {
  it.each<[OrderType, string]>([
    ['BUY', 'Compra'],
    ['SELL', 'Venta'],
    ['TRANSFER', 'Traspaso'],
  ])('mapea %s → %s', (type, expected) => {
    expect(getOrderTypeLabel(type)).toBe(expected);
  });
});

describe('getOrderTypeTone', () => {
  it.each<[OrderType, string]>([
    ['BUY', 'green'],
    ['SELL', 'red'],
    ['TRANSFER', 'blue'],
  ])('mapea %s → %s', (type, expected) => {
    expect(getOrderTypeTone(type)).toBe(expected);
  });
});

describe('getOrderSign', () => {
  it.each<[OrderType, string]>([
    ['BUY', '+'],
    ['SELL', '-'],
    ['TRANSFER', ''],
  ])('mapea %s → "%s"', (type, expected) => {
    expect(getOrderSign(type)).toBe(expected);
  });
});

describe('formatDate', () => {
  it('formatea fechas ISO correctamente', () => {
    const result = formatDate('2026-02-16T10:30:00Z');
    expect(result).not.toBe('---');
    expect(result).toContain('2026');
  });

  it('devuelve "---" para fechas inválidas', () => {
    expect(formatDate('invalid')).toBe('---');
    expect(formatDate('')).toBe('---');
  });
});

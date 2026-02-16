import { describe, it, expect } from 'vitest';
import { getOrderTypeLabel, getOrderTypeTone, getOrderSign, formatDate } from './orders'; // Ajusta la ruta
import type { OrderType } from '@domain/orders/models';

describe('orders utils', () => {
  describe('getOrderTypeLabel', () => {
    const cases: Record<OrderType, string> = {
      BUY: 'Compra',
      SELL: 'Venta',
      TRANSFER: 'Traspaso',
    };

    Object.entries(cases).forEach(([type, expected]) => {
      it(`should return "${expected}" for type ${type}`, () => {
        expect(getOrderTypeLabel(type as OrderType)).toBe(expected);
      });
    });
  });

  describe('getOrderTypeTone', () => {
    const cases: Record<OrderType, string> = {
      BUY: 'green',
      SELL: 'red',
      TRANSFER: 'blue',
    };

    Object.entries(cases).forEach(([type, expected]) => {
      it(`should return "${expected}" for type ${type}`, () => {
        expect(getOrderTypeTone(type as OrderType)).toBe(expected);
      });
    });
  });

  describe('getOrderSign', () => {
    const cases: Record<OrderType, string> = {
      BUY: '+',
      SELL: '-',
      TRANSFER: '',
    };

    Object.entries(cases).forEach(([type, expected]) => {
      it(`should return "${expected}" for type ${type}`, () => {
        expect(getOrderSign(type as OrderType)).toBe(expected);
      });
    });
  });

  describe('formatDate', () => {
    it('should format date string into es-ES medium style', () => {
      const date = '1991-11-01T10:30:00Z';
      const result = formatDate(date);

      expect(result).toMatch(/1\s[a-z]{3}\.?\s1991/i);
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it('should handle invalid date strings gracefully', () => {
      expect(formatDate('invalid-date')).toBe('---');
    });
  });
});

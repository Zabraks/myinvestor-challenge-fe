import { describe, it, expect } from 'vitest';
import {
  buySchema,
  createSellSchema,
  createTransferSchema,
  BUY_MAX_AMOUNT,
  MESSAGES,
} from './action.validation';

describe('buySchema', () => {
  it('should validate a valid value', () => {
    const result = buySchema.safeParse({ amount: 500 });
    expect(result.success).toBe(true);
  });

  it('should fail if value is zero', () => {
    const result = buySchema.safeParse({ amount: 0 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if value is negative', () => {
    const result = buySchema.safeParse({ amount: -10 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if value exceeds max allowed', () => {
    const result = buySchema.safeParse({ amount: BUY_MAX_AMOUNT + 1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(MESSAGES.buyMax);
    }
  });

  it('should fail if value is not a number', () => {
    const result = buySchema.safeParse({ amount: '100' });
    expect(result.success).toBe(false);
  });
});

describe('createSellSchema', () => {
  const MAX_QUANTITY = 100;

  it('should validate a valid value', () => {
    const result = createSellSchema(MAX_QUANTITY).safeParse({ amount: 50 });
    expect(result.success).toBe(true);
  });

  it('should fail if value is zero', () => {
    const result = createSellSchema(MAX_QUANTITY).safeParse({ amount: 0 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if value is negative', () => {
    const result = createSellSchema(MAX_QUANTITY).safeParse({ amount: -10 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if value exceeds max quantity', () => {
    const result = createSellSchema(MAX_QUANTITY).safeParse({ amount: MAX_QUANTITY + 1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(MESSAGES.sellMax(MAX_QUANTITY));
    }
  });

  it('should fail if value is not a number', () => {
    const result = createSellSchema(MAX_QUANTITY).safeParse({ amount: 'test' });
    expect(result.success).toBe(false);
  });
});

describe('createTransferSchema', () => {
  const MAX_QUANTITY = 100;

  it('should validate valid data', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: 50,
      fund: 'JPMorgan',
    });
    expect(result.success).toBe(true);
  });

  it('should fail if amount is zero', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: 0,
      fund: 'JPMorgan',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if amount is negative', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: -10,
      fund: 'JPMorgan',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.positive);
    }
  });

  it('should fail if amount exceeds max quantity', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: MAX_QUANTITY + 1,
      fund: 'JPMorgan',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(MESSAGES.transferMax(MAX_QUANTITY));
    }
  });

  it('should fail if amount is not a number', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({ amount: 'test' });
    expect(result.success).toBe(false);
  });

  it('should fail if fund is empty', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: 10,
      fund: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.fundRequired);
    }
  });

  it('should fail if fund is not a string', () => {
    const result = createTransferSchema(MAX_QUANTITY).safeParse({
      amount: 10,
      fund: 10,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(MESSAGES.fundRequired);
    }
  });
});

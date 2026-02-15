import {
  buyFundSchema,
  BUY_FUND_MAX_AMOUNT,
  BUY_VALIDATION_STRINGS,
} from '@domain/funds/validation';

describe('buyFundSchema', () => {
  it('should validate a valid value', () => {
    const validData = { amount: 500 };
    const result = buyFundSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('should fail if value is zero', () => {
    const result = buyFundSchema.safeParse({ amount: 0 });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(BUY_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if value is a negative value', () => {
    const result = buyFundSchema.safeParse({ amount: 0 });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(BUY_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if value is up to max allowed', () => {
    const result = buyFundSchema.safeParse({ amount: BUY_FUND_MAX_AMOUNT + 1 });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(BUY_VALIDATION_STRINGS.MAX_VALUE_VALIDATION);
    }
  });

  it('should fail if value is not a number', () => {
    const result = buyFundSchema.safeParse({ amount: '100' });

    expect(result.success).toBe(false);
  });
});

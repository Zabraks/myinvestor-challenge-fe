import { sellFundSchemaType, SELL_VALIDATION_STRINGS } from '@domain/funds/validation';

const DEFAULT_SCHEMA_VALUE = 100;

describe('buyFundSchema', () => {
  it('should validate a valid value', () => {
    const validData = { amount: 50 };
    const result = sellFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('should fail if value is zero', () => {
    const result = sellFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({ amount: 0 });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(SELL_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if value is a negative value', () => {
    const result = sellFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({ amount: -10 });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(SELL_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if value is up to max allowed', () => {
    const result = sellFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: DEFAULT_SCHEMA_VALUE + 1,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        SELL_VALIDATION_STRINGS.MAX_VALUE_VALIDATION(DEFAULT_SCHEMA_VALUE)
      );
    }
  });

  it('should fail if value is not a number', () => {
    const result = sellFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({ amount: 'test' });

    expect(result.success).toBe(false);
  });
});

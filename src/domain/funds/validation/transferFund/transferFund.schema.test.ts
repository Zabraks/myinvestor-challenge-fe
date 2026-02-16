import { transferFundSchemaType, TRANSFER_VALIDATION_STRINGS } from '@domain/funds/validation';

const DEFAULT_SCHEMA_VALUE = 100;

describe('transferFundSchema', () => {
  it('should validate a valid value', () => {
    const validData = { amount: 50, fund: 'JPMorgan' };
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('should fail if amount value is zero', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: 0,
      fund: 'JPMorgan',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(TRANSFER_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if amoun value is a negative value', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: -10,
      field: 'JPMorgan',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(TRANSFER_VALIDATION_STRINGS.POSITIVE_VALIDATION);
    }
  });

  it('should fail if value is up to max allowed', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: DEFAULT_SCHEMA_VALUE + 1,
      field: 'JPMorgan',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        TRANSFER_VALIDATION_STRINGS.MAX_VALUE_VALIDATION(DEFAULT_SCHEMA_VALUE)
      );
    }
  });

  it('should fail if amount value is not a number', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({ amount: 'test' });

    expect(result.success).toBe(false);
  });

  it('should fail if amount fund value is empty', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: 10,
      fund: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(TRANSFER_VALIDATION_STRINGS.STRING_VALIDATION);
    }
  });

  it('should fail if fund value is not an string', () => {
    const result = transferFundSchemaType(DEFAULT_SCHEMA_VALUE).safeParse({
      amount: 10,
      fund: 10,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(TRANSFER_VALIDATION_STRINGS.STRING_VALIDATION);
    }
  });
});

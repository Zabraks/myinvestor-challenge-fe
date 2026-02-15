import { z } from 'zod';

export const BUY_FUND_MAX_AMOUNT = 10000;

export const BUY_VALIDATION_STRINGS = {
  NUMBER_VALIDATION: 'El valor introducido ha de ser un número',
  POSITIVE_VALIDATION: 'La cantidad debe ser mayor que 0',
  MAX_VALUE_VALIDATION: `La cuantía no puede superar los ${BUY_FUND_MAX_AMOUNT}€`,
};

export const buyFundSchema = z.object({
  amount: z
    .number({ message: BUY_VALIDATION_STRINGS.NUMBER_VALIDATION })
    .positive({ message: BUY_VALIDATION_STRINGS.POSITIVE_VALIDATION })
    .max(BUY_FUND_MAX_AMOUNT, {
      message: BUY_VALIDATION_STRINGS.MAX_VALUE_VALIDATION,
    }),
});

export type BuyFundFormData = z.infer<typeof buyFundSchema>;

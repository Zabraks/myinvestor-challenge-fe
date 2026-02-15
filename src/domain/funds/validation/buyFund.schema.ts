import { z } from 'zod';

export const BUY_FUND_MAX_AMOUNT = 10000;

export const buyFundSchema = z.object({
  amount: z
    .number({ message: 'El valor introducido ha de ser un número' })
    .positive({ message: 'La cantidad debe ser mayor que 0' })
    .max(BUY_FUND_MAX_AMOUNT, {
      message: `La cuantía no puede superar los ${BUY_FUND_MAX_AMOUNT}€`,
    }),
});

export type BuyFundFormData = z.infer<typeof buyFundSchema>;

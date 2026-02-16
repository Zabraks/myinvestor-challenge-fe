import { z } from 'zod';

export const SELL_VALIDATION_STRINGS = {
  NUMBER_VALIDATION: 'El valor introducido ha de ser un número',
  POSITIVE_VALIDATION: 'La cantidad debe ser mayor que 0',
  MAX_VALUE_VALIDATION: (max: number) => `No puedes vender más de ${max} participaciones`,
};

export const sellFundSchemaType = (maxQuantity: number) =>
  z.object({
    amount: z
      .number({ message: SELL_VALIDATION_STRINGS.NUMBER_VALIDATION })
      .positive({ message: SELL_VALIDATION_STRINGS.POSITIVE_VALIDATION })
      .max(maxQuantity, {
        message: SELL_VALIDATION_STRINGS.MAX_VALUE_VALIDATION(maxQuantity),
      }),
  });

export type SellFundFormData = z.infer<ReturnType<typeof sellFundSchemaType>>;

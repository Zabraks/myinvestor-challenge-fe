import { z } from 'zod';

export const sellFundSchemaType = (maxPosition: number) =>
  z.object({
    amount: z
      .number({ message: 'El valor introducido ha de ser un número' })
      .positive({ message: 'La cantidad debe ser mayor que 0' })
      .max(maxPosition, {
        message: `No puedes vender más de ${maxPosition} unidades`,
      }),
  });

export type SellFundFormData = z.infer<ReturnType<typeof sellFundSchemaType>>;

import { z } from 'zod';

export const TRANSFER_VALIDATION_STRINGS = {
  NUMBER_VALIDATION: 'El valor introducido ha de ser un número',
  POSITIVE_VALIDATION: 'La cantidad debe ser mayor que 0',
  MAX_VALUE_VALIDATION: (max: number) => `No puedes vender más de ${max} participaciones`,
  STRING_VALIDATION: 'Tiene que elegir un fondo',
};

export const transferFundSchemaType = (maxQuantity: number) =>
  z.object({
    amount: z
      .number({ message: TRANSFER_VALIDATION_STRINGS.NUMBER_VALIDATION })
      .positive({ message: TRANSFER_VALIDATION_STRINGS.POSITIVE_VALIDATION })
      .max(maxQuantity, {
        message: TRANSFER_VALIDATION_STRINGS.MAX_VALUE_VALIDATION(maxQuantity),
      }),
    fund: z
      .string({ message: TRANSFER_VALIDATION_STRINGS.STRING_VALIDATION })
      .min(1, { message: TRANSFER_VALIDATION_STRINGS.STRING_VALIDATION }),
  });

export type TransferFundFormData = z.infer<ReturnType<typeof transferFundSchemaType>>;

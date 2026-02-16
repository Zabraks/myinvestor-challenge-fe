import { z } from 'zod';

export const BUY_MAX_AMOUNT = 10000;

export const MESSAGES = {
  numberRequired: 'El valor introducido ha de ser un número',
  positive: 'La cantidad debe ser mayor que 0',
  buyMax: `La cuantía no puede superar los ${BUY_MAX_AMOUNT}€`,
  sellMax: (max: number) => `No puedes vender más de ${max} participaciones`,
  transferMax: (max: number) => `No puedes traspasar más de ${max} participaciones`,
  fundRequired: 'Tiene que elegir un fondo',
};

export const buySchema = z.object({
  amount: z
    .number({ message: MESSAGES.numberRequired })
    .positive({ message: MESSAGES.positive })
    .max(BUY_MAX_AMOUNT, { message: MESSAGES.buyMax }),
});

export const createSellSchema = (max: number) =>
  z.object({
    amount: z
      .number({ message: MESSAGES.numberRequired })
      .positive({ message: MESSAGES.positive })
      .max(max, { message: MESSAGES.sellMax(max) }),
  });

export const createTransferSchema = (max: number) =>
  z.object({
    amount: z
      .number({ message: MESSAGES.numberRequired })
      .positive({ message: MESSAGES.positive })
      .max(max, { message: MESSAGES.transferMax(max) }),
    fund: z.string({ message: MESSAGES.fundRequired }).min(1, { message: MESSAGES.fundRequired }),
  });

export type BuyFormData = z.infer<typeof buySchema>;
export type SellFormData = z.infer<ReturnType<typeof createSellSchema>>;
export type TransferFormData = z.infer<ReturnType<typeof createTransferSchema>>;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellFundApi } from '@services/funds/sellFund.api';
import type { SellFundInput } from '@domain/funds/sell';
import type { Order } from '@domain/orders/models';
import { toast } from 'sonner';

export const useSellFund = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SellFundInput) => sellFundApi(input.fundId, { quantity: input.amount }),
    onSuccess: (_data, variables) => {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        type: 'SELL',
        fundId: variables.fundId,
        fundName: variables.fundName,
        quantity: variables.amount,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Order[]>(['orders'], (old = []) => [newOrder, ...old]);

      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('El fondo se ha vendido correctamente');
      onClose();
    },
    onError: () => {
      toast.error('Ha habido un error en la petición');
    },
  });
};

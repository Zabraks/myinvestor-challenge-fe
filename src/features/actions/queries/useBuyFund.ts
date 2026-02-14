import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFundApi } from '@services/funds/buyFund.api';
import type { BuyFundInput } from '@domain/funds/buy';
import type { Order } from '@domain/orders/models';
import { toast } from 'sonner';

export const useBuyFund = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: BuyFundInput) => buyFundApi(input.fundId, { quantity: input.amount }),
    onSuccess: (_data, variables) => {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        type: 'BUY',
        fundId: variables.fundId,
        fundName: variables.fundName,
        quantity: variables.amount,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Order[]>(['orders'], (old = []) => [newOrder, ...old]);

      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('El fondo se ha comprado correctamente');
      onClose();
    },
    onError: () => {
      toast.error('Ha habido un error en la petición');
    },
  });
};

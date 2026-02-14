import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellFundApi } from '@services/funds/sellFund.api';
import type { FundActionResult, FundActionInput } from '@domain/funds/types';
import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';
import type { SellFundInput } from '@domain/funds/sell';
import type { Order } from '@domain/orders/models';
import { toast } from 'sonner';

interface UseSellFundOptions {
  onSuccess: () => void;
}

export const useSellFund = ({ onSuccess }: UseSellFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<FundActionResult, Error, FundActionInput>({
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
      showSuccessToast('El fondo se ha vendido correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

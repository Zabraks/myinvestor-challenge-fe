import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellFund } from '@services/fund-action';
import type { ActionResult, ActionInput } from '@domain/action';
import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';
import type { Order } from '@domain/order';

interface UseSellFundOptions {
  onSuccess: () => void;
}

export const useSellFund = ({ onSuccess }: UseSellFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ActionResult, Error, ActionInput>({
    mutationFn: (input: ActionInput) => sellFund(input.fundId, { quantity: input.amount }),
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

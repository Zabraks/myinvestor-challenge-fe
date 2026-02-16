import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFund } from '@services/fund-action';
import type { ActionResult, ActionInput } from '@domain/action';
import type { Order } from '@domain/order';

import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

interface UseBuyFundOptions {
  onSuccess: () => void;
}

export const useBuyFund = ({ onSuccess }: UseBuyFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ActionResult, Error, ActionInput>({
    mutationFn: (input: ActionInput) => buyFund(input.fundId, { quantity: input.amount }),
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
      showSuccessToast('El fondo se ha comprado correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transferFund } from '@services/fund-action';
import type { TransferInput } from '@domain/action';
import type { Order } from '@domain/order';

import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

export const useTransferFund = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TransferInput) =>
      transferFund({
        fromFundId: input.fromFundId,
        toFundId: input.toFundId,
        quantity: input.amount,
      }),
    onSuccess: (_data, variables) => {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        type: 'TRANSFER',
        fundId: variables.fromFundId,
        fundName: variables.fromFundName,
        fundDestinationId: variables.toFundId,
        fundDestinationName: variables.toFundName,
        quantity: variables.amount,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Order[]>(['orders'], (old = []) => [newOrder, ...old]);

      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      showSuccessToast('El fondo se ha transferido correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

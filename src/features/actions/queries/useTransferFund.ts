import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transferFundApi } from '@services/funds/transferFund.api';
import type { TransferFundInput } from '@domain/funds/transfer';
import type { Order } from '@domain/orders/models';
import { toast } from 'sonner';

export const useTransferFund = (closeDialog: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TransferFundInput) =>
      transferFundApi({
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
      toast.success('El fondo se ha transferido correctamente correctamente');
      closeDialog();
    },
    onError: () => {
      toast.error('Ha habido un error en la petición');
    },
  });
};

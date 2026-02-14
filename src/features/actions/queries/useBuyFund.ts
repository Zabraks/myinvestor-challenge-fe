import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFundApi } from '@services/funds/buyFund.api';
import type { FundActionResult, FundActionInput } from '@domain/funds/types';
import type { BuyFundInput } from '@domain/funds/buy';
import type { Order } from '@domain/orders/models';
import { toast } from 'sonner';

import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

interface UseBuyFundOptions {
  onSuccess: () => void;
}

export const useBuyFund = ({ onSuccess }: UseBuyFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<FundActionResult, Error, FundActionInput>({
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
      showSuccessToast('El fondo se ha comprado correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

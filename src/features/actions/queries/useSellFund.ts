import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellFundApi } from '@services/funds/sellFund.api';
import type { SellFundInput } from '@domain/funds/sell';
import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

export const useSellFund = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fundId, amount }: SellFundInput) => sellFundApi(fundId, { quantity: amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      showSuccessToast('El fondo se ha vendido correctamente');
      onClose();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

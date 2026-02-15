import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFundApi } from '@services/funds/buyFund.api';
import type { BuyFundInput } from '@domain/funds/buy';
import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

export const useBuyFund = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fundId, amount }: BuyFundInput) => buyFundApi(fundId, { quantity: amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      showSuccessToast('El fondo se ha comprado correctamente');
      onClose();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

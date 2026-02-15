import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellFundApi } from '@services/funds/sellFund.api';
import type { FundActionResult, FundActionInput } from '@domain/funds/types';
import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

interface UseSellFundOptions {
  onSuccess: () => void;
}

export const useSellFund = ({ onSuccess }: UseSellFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<FundActionResult, Error, FundActionInput>({
    mutationFn: ({ fundId, amount }) => sellFundApi(fundId, { quantity: amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      showSuccessToast('El fondo se ha vendido correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

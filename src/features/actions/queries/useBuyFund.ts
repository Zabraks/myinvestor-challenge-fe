import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFundApi } from '@services/funds/buyFund.api';
import type { FundActionResult, FundActionInput } from '@domain/funds/types';

import { showSuccessToast, showErrorToast } from '@features/actions/components/ActionToast';

interface UseBuyFundOptions {
  onSuccess: () => void;
}

export const useBuyFund = ({ onSuccess }: UseBuyFundOptions) => {
  const queryClient = useQueryClient();

  return useMutation<FundActionResult, Error, FundActionInput>({
    mutationFn: ({ fundId, amount }) => buyFundApi(fundId, { quantity: amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      showSuccessToast('El fondo se ha comprado correctamente');
      onSuccess();
    },
    onError: () => {
      showErrorToast('Ha habido un error en la petición');
    },
  });
};

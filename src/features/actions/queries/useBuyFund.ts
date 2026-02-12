import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyFundApi } from '@services/funds/buyFund.api';
import type { BuyFundInput } from '@domain/funds/buy';
import { toast } from 'sonner';

export const useBuyFund = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fundId, amount }: BuyFundInput) => buyFundApi(fundId, { quantity: amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('El fondo se ha comprado correctamente');
      onClose();
    },
    onError: () => {
      toast.error('Ha habido un error en la petición');
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import type { Order } from '@domain/orders/models';

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      return [];
    },
    initialData: [],
    staleTime: Infinity,
  });
}

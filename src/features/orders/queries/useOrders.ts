import { useQuery } from '@tanstack/react-query';
import type { Order } from '@domain/order';

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

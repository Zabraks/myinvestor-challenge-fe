import { useQuery } from '@tanstack/react-query';

export const usePortfolio = () =>
  useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/portfolio');
      if (!res.ok) {
        throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
      }
      return res.json() as Promise<[]>;
    },
  });

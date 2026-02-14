import { usePortfolio } from '../queries/usePortfolio';
import { useFundsCatalog } from '@features/portfolio/queries/useFundsCatalog';
import { sortByName } from '@domain/portfolio/utils/sortByName';
import { groupByCategory } from '@domain/portfolio/utils/groupByCategory';

import type { FundTableItem } from '@/domain/funds/types';

export function usePortfolioViewModel() {
  const portfolioQuery = usePortfolio();
  const fundsQuery = useFundsCatalog();

  if (portfolioQuery.isLoading || fundsQuery.isLoading) {
    return { isLoading: true };
  }

  if (portfolioQuery.isError || fundsQuery.isError) {
    return { isError: true };
  }

  if (!portfolioQuery.data || !fundsQuery.data) {
    return { isLoading: portfolioQuery.isLoading || fundsQuery.isLoading };
  }

  const fundsById = new Map(fundsQuery.data.map((fund: FundTableItem) => [fund.id, fund]));

  const enriched = portfolioQuery.data.items.map((item) => {
    const fund = fundsById.get(item.id);

    return {
      ...item,
      name: fund?.name ?? 'Unknown fund',
      category: fund?.category ?? 'Other',
    };
  });

  const grouped = groupByCategory(enriched);

  const groupedAndSorted = grouped.map((group) => ({
    ...group,
    items: sortByName(group.items),
  }));

  return {
    isLoading: false,
    data: groupedAndSorted,
  };
}

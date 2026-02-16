import { usePortfolio } from '../queries/usePortfolio';
import { useFundsCatalog } from '@features/portfolio/queries/useFundsCatalog';
import { sortByName } from '@domain/portfolio/utils/sortByName';
import { formatValue } from '@domain/portfolio/utils/formatValue';
import { groupByCategory } from '@domain/portfolio/utils/groupByCategory';
import { CATEGORY_LABELS } from '@/domain/portfolio/constants';
import type { CategoryKey } from '@/domain/portfolio/constants';

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

    const rawCategory = fund?.category as CategoryKey;

    return {
      ...item,
      name: fund?.name ?? 'fondo desconocido',
      category: CATEGORY_LABELS[rawCategory] ?? rawCategory ?? 'Otros',
      totalValue: formatValue(item.totalValue),
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

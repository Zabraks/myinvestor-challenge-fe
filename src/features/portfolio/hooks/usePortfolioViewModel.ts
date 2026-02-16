import { usePortfolio } from '../queries/usePortfolio';
import { useFundsCatalog } from '@features/portfolio/queries/useFundsCatalog';
import { sortByName, groupByCategory, formatCurrency } from '@domain/portfolio';
import { CATEGORY_LABELS, type CategoryKey, type Fund } from '@domain/fund';

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

  const fundsById = new Map(fundsQuery.data.map((fund: Fund) => [fund.id, fund]));

  const enriched = portfolioQuery.data.items.map((item) => {
    const fund = fundsById.get(item.id);

    const rawCategory = fund?.category as CategoryKey;

    return {
      ...item,
      name: fund?.name ?? 'fondo desconocido',
      category: CATEGORY_LABELS[rawCategory] ?? rawCategory ?? 'Otros',
      totalValue: formatCurrency(item.totalValue),
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

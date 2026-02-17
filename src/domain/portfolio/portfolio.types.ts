export interface PortfolioItem {
  id: string;
  name: string;
  quantity: number;
  totalValue: number;
}

export interface DisplayPortfolioItem extends Omit<PortfolioItem, 'totalValue'> {
  category: string;
  totalValue: string;
}

export interface Portfolio {
  items: PortfolioItem[];
}

export interface CategoryGroup<T> {
  nameCategory: string;
  items: T[];
}

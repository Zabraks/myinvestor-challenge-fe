export interface PortfolioItem {
  id: string;
  name: string;
  quantity: number;
  totalValue: number;
}

export interface Portfolio {
  items: PortfolioItem[];
}

export interface CategoryGroup<T> {
  nameCategory: string;
  items: T[];
}

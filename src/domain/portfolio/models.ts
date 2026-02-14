export interface PortfolioFundBase {
  id: string;
  name: string;
}

export interface PortfolioItemType extends PortfolioFundBase {
  quantity: number;
  totalValue: number;
}

export interface Portfolio {
  items: PortfolioItemType[];
}

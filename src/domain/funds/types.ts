type Category = 'GLOBAL' | 'TECH' | 'HEALTH' | 'MONEY_MARKET';
type Currency = 'USD' | 'EUR';

export interface FundTableItem {
  id: string;
  name: string;
  category: Category;
  currency: Currency;
  value: number;
  symbol: string;
  YTD: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
}

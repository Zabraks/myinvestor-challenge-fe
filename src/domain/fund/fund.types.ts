import type { CategoryLabel } from './fund.constants';

export type Category = 'GLOBAL' | 'TECH' | 'HEALTH' | 'MONEY_MARKET';
export type Currency = 'USD' | 'EUR';
export type SortDirection = 'asc' | 'desc';

export interface BackendSort {
  field: string;
  direction: SortDirection;
}

export interface Fund {
  id: string;
  name: string;
  category: CategoryLabel;
  currency: Currency;
  value: number;
  symbol: string;
  YTD: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
}

export interface ApiFund {
  id: string;
  name: string;
  category: Category;
  currency: Currency;
  value: number;
  symbol: string;
  profitability: {
    YTD: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetFundsApiResponse {
  data: ApiFund[];
  pagination: Pagination;
}

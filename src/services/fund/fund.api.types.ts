import type { Category, Currency } from '@domain/fund';

export interface GetFundByIdApiDataResponse {
  id: string;
  name: string;
  symbol: string;
  value: number;
  currency: Currency;
  category: Category;
  profitability: {
    YTD: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
}

export interface GetFundByIdApiResponse {
  data: GetFundByIdApiDataResponse;
}

export interface GetFundsParams {
  page: number;
  limit: number;
  field?: string;
  direction?: 'asc' | 'desc';
}

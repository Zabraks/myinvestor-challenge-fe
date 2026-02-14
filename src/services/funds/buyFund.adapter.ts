import type { BuyFundApiResponse } from './buyFund.api.types';
import type { BuyFundResult } from '@domain/funds/buy';

export const mapBuyFundFromApi = (api: BuyFundApiResponse): BuyFundResult => ({
  message: api.message,
  data: api.data.portfolio.map((item) => item),
});

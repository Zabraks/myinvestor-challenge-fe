import type { SellFundApiResponse } from '@services/funds/sellFund.api.types';
import type { SellFundResult } from '@domain/funds/sell';

export const mapSellFundFromApi = (api: SellFundApiResponse): SellFundResult => ({
  message: api.message,
  data: api.data.portfolio.map((item) => item),
});

import type { FundTableItem } from '@domain/funds/types';

export const mapFundFromApi = (apiFund): FundTableItem => ({
  id: apiFund.id,
  name: apiFund.name,
  category: apiFund.category,
  currency: apiFund.currency,
  value: apiFund.value,
  symbol: apiFund.symbol,
  YTD: apiFund.profitability.YTD,
  oneYear: apiFund.profitability.oneYear,
  threeYears: apiFund.profitability.threeYears,
  fiveYears: apiFund.profitability.fiveYears,
});

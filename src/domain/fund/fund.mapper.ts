import type { Fund, ApiFund } from './fund.types';

export function mapFundFromApi(api: ApiFund): Fund {
  return {
    id: api.id,
    name: api.name,
    category: api.category,
    currency: api.currency,
    value: api.value,
    symbol: api.symbol,
    YTD: api.profitability.YTD,
    oneYear: api.profitability.oneYear,
    threeYears: api.profitability.threeYears,
    fiveYears: api.profitability.fiveYears,
  };
}

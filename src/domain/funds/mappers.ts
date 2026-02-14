import type { FundTableItem } from '@domain/funds/types';
import type { GetFundByIdApiDataResponse } from '@services/funds/getFundById.api.types';

export const mapFundFromApi = (apiData: GetFundByIdApiDataResponse): FundTableItem => {
  return {
    id: apiData.id,
    name: apiData.name,
    category: apiData.category,
    currency: apiData.currency,
    value: apiData.value,
    symbol: apiData.symbol,
    YTD: apiData.profitability.YTD,
    oneYear: apiData.profitability.oneYear,
    threeYears: apiData.profitability.threeYears,
    fiveYears: apiData.profitability.fiveYears,
  };
};

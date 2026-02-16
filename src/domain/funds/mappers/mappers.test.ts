import { describe, it, expect } from 'vitest';
import { mapFundFromApi } from './mappers'; // Ajusta la ruta
import type { ApiFund } from '@domain/funds/types';

describe('mapFundFromApi', () => {
  it.only('should correctly map an ApiFund to a FundTableItem', () => {
    const mockApiFund: ApiFund = {
      id: '1',
      name: 'Global Equity Fund',
      symbol: 'GEF',
      value: 120.45,
      currency: 'USD',
      category: 'GLOBAL',
      profitability: {
        YTD: 0.05,
        oneYear: 0.12,
        threeYears: 0.35,
        fiveYears: 0.5,
      },
    };

    const result = mapFundFromApi(mockApiFund);

    expect(result).toEqual({
      id: '1',
      name: 'Global Equity Fund',
      symbol: 'GEF',
      value: 120.45,
      currency: 'USD',
      category: 'GLOBAL',
      YTD: 0.05,
      oneYear: 0.12,
      threeYears: 0.35,
      fiveYears: 0.5,
    });
  });
});

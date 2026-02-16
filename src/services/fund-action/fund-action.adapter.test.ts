import { describe, it, expect } from 'vitest';
import { mapFundActionFromApi } from './fund-action.adapter';
import type { FundActionResponse } from './fund-action.types';
import { actionFactory } from '@/mocks/factories';

describe('mapFundActionFromApi', () => {
  it('should transform the api response to domain format', () => {
    const fund = { id: '1', quantity: 50 };

    const mockPortfolio = actionFactory.build({
      data: {
        portfolio: [fund],
      },
    }) as FundActionResponse;

    const result = mapFundActionFromApi(mockPortfolio);

    expect(result).toEqual({
      message: 'Purchase successful',
      portfolio: [fund],
    });
  });
});

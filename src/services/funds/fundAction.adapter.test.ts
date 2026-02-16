import { describe, it, expect } from 'vitest';
import { mapFundActionFromApi } from './fundAction.adapter';
import type { FundActionApiResponse } from './fundAction.api.types';
import { actionFactory } from '@/mocks/factories';

describe('mapFundActionFromApi', () => {
  it('should transform the api response to domain format', () => {
    const fund = { id: 'mi-id-especifico', quantity: 50 };

    const mockPortfolio = actionFactory.build({
      data: {
        portfolio: [fund],
      },
    }) as FundActionApiResponse;

    const result = mapFundActionFromApi(mockPortfolio);

    expect(result).toEqual({
      message: 'Purchase successful',
      data: [fund],
    });
  });
});

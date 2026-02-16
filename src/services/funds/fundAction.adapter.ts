import type { FundActionResult } from '@domain/funds/types';
import type { FundActionApiResponse } from './fundAction.api.types';

export const mapFundActionFromApi = (api: FundActionApiResponse): FundActionResult => ({
  message: api.message,
  data: api.data.portfolio,
});

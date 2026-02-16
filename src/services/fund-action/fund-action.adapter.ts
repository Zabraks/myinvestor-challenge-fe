import type { ActionResult } from '@domain/action';
import type { FundActionResponse } from './fund-action.types';

export const mapFundActionFromApi = (api: FundActionResponse): ActionResult => ({
  message: api.message,
  portfolio: api.data.portfolio,
});

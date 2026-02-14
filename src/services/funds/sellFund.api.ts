import type { SellFundApiRequest, SellFundApiResponse } from '@services/funds/sellFund.api.types';
import type { SellFundResult } from '@domain/funds/sell';
import type {
  FundActionApiRequest,
  FundActionApiResponse,
} from '@services/funds/fundAction.api.types';
import { mapSellFundFromApi } from '@services/funds/sellFund.adapter';

export const sellFundApi = async (
  fundId: string,
  payload: FundActionApiRequest
): Promise<FundActionApiResponse> => {
  const res = await fetch(`http://localhost:3000/funds/${fundId}/sell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error selling fund');
  }

  const data: FundActionApiResponse = await res.json();

  return mapSellFundFromApi(data);
};

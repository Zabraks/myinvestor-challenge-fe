import type { SellFundApiRequest, SellFundApiResponse } from '@services/funds/sellFund.api.types';
import { mapSellFundFromApi } from '@services/funds/sellFund.adapter';

export const sellFundApi = async (fundId: string, payload: SellFundApiRequest) => {
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

  const data: SellFundApiResponse = await res.json();

  return mapSellFundFromApi(data);
};

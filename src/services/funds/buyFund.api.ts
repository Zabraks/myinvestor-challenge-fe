import type { BuyFundApiRequest, BuyFundApiResponse } from './buyFund.api.types';
import { mapBuyFundFromApi } from './buyFund.adapter';

export const buyFundApi = async (fundId: string, payload: BuyFundApiRequest) => {
  const res = await fetch(`http://localhost:3000/funds/${fundId}/buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error buying fund');
  }

  const data: BuyFundApiResponse = await res.json();

  return mapBuyFundFromApi(data);
};

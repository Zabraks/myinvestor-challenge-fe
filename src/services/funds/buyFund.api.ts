import type { BuyFundApiRequest, BuyFundApiResponse } from './buyFund.api.types';
import { mapFundActionFromApi } from './fundAction.adapter';

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

  return mapFundActionFromApi(data);
};

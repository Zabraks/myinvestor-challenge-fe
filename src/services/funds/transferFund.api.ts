import type {
  TransferFundApiRequest,
  TransferFundApiResponse,
} from '@services/funds/transferFund.api.types';
import { mapFundActionFromApi } from '@services/funds/fundAction.adapter';

export const transferFundApi = async (payload: TransferFundApiRequest) => {
  const res = await fetch(`http://localhost:3000/funds/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error transfering fund');
  }

  const data: TransferFundApiResponse = await res.json();

  return mapFundActionFromApi(data);
};

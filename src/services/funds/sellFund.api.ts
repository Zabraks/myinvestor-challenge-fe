import type {
  FundActionApiRequest,
  FundActionApiResponse,
} from '@services/funds/fundAction.api.types';
import { mapFundActionFromApi } from '@services/funds/fundAction.adapter';
import type { FundActionResult } from '@domain/funds/types';

export const sellFundApi = async (
  fundId: string,
  payload: FundActionApiRequest
): Promise<FundActionResult> => {
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

  return mapFundActionFromApi(data);
};

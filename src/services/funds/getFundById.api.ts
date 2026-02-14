//TODO: cambiar nombre por FundData
import type { FundTableItem } from '@domain/funds/types';
import { mapFundFromApi } from '@domain/funds/mappers';
import type { GetFundByIdApiResponse } from './getFundById.api.types';

export async function getFundById(id: string): Promise<FundTableItem> {
  const res = await fetch(`http://localhost:3000/funds/${id}`);
  if (!res.ok) throw new Error('Error fetching fund');

  const json = (await res.json()) as GetFundByIdApiResponse;

  return mapFundFromApi(json.data);
}

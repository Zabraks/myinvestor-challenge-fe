// Fund API - read/query operations
import type { Fund, GetFundsApiResponse, Pagination } from '@domain/fund';
import { mapFundFromApi } from '@domain/fund';
import type { GetFundByIdApiResponse } from './fund.api.types';

interface GetFundsResponse {
  pagination: Pagination;
  data: Fund[];
}

export const getFunds = async (
  page: number,
  limit: number,
  field?: string,
  direction?: 'asc' | 'desc'
): Promise<GetFundsResponse> => {
  const sorting = field && direction ? `&sort=${field}%3A${direction}` : '';

  const res = await fetch(`http://localhost:3000/funds?page=${page}&limit=${limit}${sorting}`);
  if (!res.ok) throw new Error('Error fetching funds');

  const { data, pagination } = (await res.json()) as GetFundsApiResponse;

  return {
    pagination,
    data: data.map(mapFundFromApi),
  };
};

export async function getFundById(id: string): Promise<Fund> {
  const res = await fetch(`http://localhost:3000/funds/${id}`);
  if (!res.ok) throw new Error('Error fetching fund');

  const json = (await res.json()) as GetFundByIdApiResponse;

  return mapFundFromApi(json.data);
}

export async function getAllFunds(): Promise<Fund[]> {
  const { data } = await getFunds(1, 1000);
  return data;
}

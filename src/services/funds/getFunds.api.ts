import { mapFundFromApi } from '@/domain/funds/mappers/mappers';
import type { GetFundsApiResponse, FundTableItem, PaginationMeta } from '@domain/funds/types';

interface GetFundsResponse {
  pagination: PaginationMeta;
  data: FundTableItem[];
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

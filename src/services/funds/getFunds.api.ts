import { mapFundFromApi } from '@domain/funds/mappers';
import type { GetFundsParams } from '@services/funds/getFunds.api.types';

export const getFunds = async ({ page, limit, field, direction }: GetFundsParams) => {
  const sorting = field && direction ? `&sort=${field}%3A${direction}` : '';

  const res = await fetch(`http://localhost:3000/funds?page=${page}&limit=${limit}${sorting}`);
  if (!res.ok) throw new Error('Error fetching funds');

  const { data, pagination } = await res.json();

  return {
    pagination,
    data: data.map(mapFundFromApi),
  };
};

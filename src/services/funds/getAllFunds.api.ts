import { getFunds } from './getFunds.api';

export async function getAllFunds() {
  const { data } = await getFunds({ page: 1, limit: 1000 });

  return data;
}

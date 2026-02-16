import { getFunds } from './getFunds.api';

export async function getAllFunds() {
  const { data } = await getFunds(1, 1000);

  return data;
}

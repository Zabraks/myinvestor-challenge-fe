import type { ActionResult } from '@domain/action';
import type {
  FundActionRequest,
  TransferFundActionRequest,
  FundActionResponse,
} from './fund-action.types';
import { mapFundActionFromApi } from './fund-action.adapter';

const API_BASE = 'http://localhost:3000';

export async function buyFund(fundId: string, request: FundActionRequest): Promise<ActionResult> {
  const res = await fetch(`${API_BASE}/funds/${fundId}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) throw new Error('Error buying fund');

  const json = (await res.json()) as FundActionResponse;
  return mapFundActionFromApi(json);
}

export async function sellFund(fundId: string, request: FundActionRequest): Promise<ActionResult> {
  const res = await fetch(`${API_BASE}/funds/${fundId}/sell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) throw new Error('Error selling fund');

  const json = (await res.json()) as FundActionResponse;
  return mapFundActionFromApi(json);
}

export async function transferFund(request: TransferFundActionRequest): Promise<ActionResult> {
  const res = await fetch(`${API_BASE}/funds/transfer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) throw new Error('Error transferring fund');

  const json = (await res.json()) as FundActionResponse;
  return mapFundActionFromApi(json);
}

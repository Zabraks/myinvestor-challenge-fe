export type ActionType = 'buy' | 'sell' | 'transfer' | 'show';

export interface ActionData {
  id: string;
  name: string;
  quantity?: number;
}

export interface ActionInput {
  fundId: string;
  fundName: string;
  amount: number;
}

export interface TransferInput {
  fromFundId: string;
  fromFundName: string;
  toFundId: string;
  toFundName: string;
  amount: number;
}

export interface ActionResult {
  message: string;
  portfolio: Array<{ id: string; quantity: number }>;
}

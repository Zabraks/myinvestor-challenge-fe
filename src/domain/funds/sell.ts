export interface SellFundInput {
  fundId: string;
  amount: number;
  fundName: string;
}

export interface SellFundResult {
  message: string;
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

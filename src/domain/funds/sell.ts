export interface SellFundInput {
  fundId: string;
  amount: number;
}

export interface SellFundResult {
  message: string;
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

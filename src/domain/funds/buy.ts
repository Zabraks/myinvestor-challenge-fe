export interface BuyFundInput {
  fundId: string;
  amount: number;
  fundName: string;
}

export interface BuyFundResult {
  message: string;
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

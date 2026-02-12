export interface BuyFundInput {
  fundId: string;
  amount: number;
}

export interface BuyFundResult {
  message: string;
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

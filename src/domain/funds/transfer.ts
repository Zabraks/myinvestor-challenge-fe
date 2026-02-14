export interface TransferFundInput {
  fromFundId: string;
  fromFundName: string;
  toFundId: string;
  toFundName: string;
  amount: number;
}

export interface TransferFundResult {
  message: string;
  data: Array<{
    id: string;
    quantity: number;
  }>;
}

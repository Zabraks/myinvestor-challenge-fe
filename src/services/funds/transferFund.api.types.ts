export interface TransferFundApiRequest {
  fromFundId: string;
  toFundId: string;
  quantity: number;
}

export interface TransferFundApiResponse {
  message: string;
  data: {
    portfolio: Array<{
      id: string;
      quantity: number;
    }>;
  };
}

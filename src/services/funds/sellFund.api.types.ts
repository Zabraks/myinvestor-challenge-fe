export interface SellFundApiRequest {
  quantity: number;
}

export interface SellFundApiResponse {
  message: string;
  data: {
    portfolio: Array<{
      id: string;
      quantity: number;
    }>;
  };
}

// services/funds/buyFund.api.types.ts
export interface BuyFundApiRequest {
  quantity: number;
}

export interface BuyFundApiResponse {
  message: string;
  data: {
    portfolio: Array<{
      id: string;
      quantity: number;
    }>;
  };
}

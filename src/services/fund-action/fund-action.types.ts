export interface FundActionRequest {
  quantity: number;
}

export interface TransferFundActionRequest {
  fromFundId: string;
  toFundId: string;
  quantity: number;
}

export interface PortfolioApiItem {
  id: string;
  quantity: number;
}

export interface FundActionResponse {
  message: string;
  data: {
    portfolio: PortfolioApiItem[];
  };
}

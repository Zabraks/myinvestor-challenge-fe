export interface FundActionApiRequest {
  quantity: number;
}

export interface PortfolioApiItem {
  id: string;
  quantity: number;
}

export interface FundActionApiResponse {
  message: string;
  data: {
    portfolio: PortfolioApiItem[];
  };
}

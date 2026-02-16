export interface PortfolioItemDto {
  id: string;
  name: string;
  quantity: number;
  totalValue: number;
}

export interface PortfolioResponseDto {
  data: PortfolioItemDto[];
}

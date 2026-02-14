export type OrderType = 'BUY' | 'SELL' | 'TRANSFER';

export interface Order {
  id: string;
  type: OrderType;
  fundId: string;
  fundName: string;
  quantity: number;
  price?: number;
  fundDestinationId?: string;
  fundDestinationName?: string;
  createdAt: string;
}

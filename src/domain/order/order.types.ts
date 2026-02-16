export type OrderType = 'BUY' | 'SELL' | 'TRANSFER';
export type OrderLabel = 'Compra' | 'Venta' | 'Traspaso';
export type OrderTone = 'green' | 'red' | 'blue';

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

export interface OrderView {
  id: string;
  fundName: string;
  fundDestinationName?: string;
  quantityLabel: string;
  type: OrderLabel;
  tone: OrderTone;
  dateLabel: string;
}

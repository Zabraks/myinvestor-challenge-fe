// features/orders/models/order.view-model.ts
export type OrderLabel = 'Compra' | 'Venta' | 'Traspaso';
export type OrderColors = 'green' | 'red' | 'blue';

export interface OrderViewModel {
  id: string;
  fundName: string;
  fundDestinationName?: string;
  quantityLabel: string;
  type: OrderLabel;
  tone: OrderColors;
  dateLabel: string;
}

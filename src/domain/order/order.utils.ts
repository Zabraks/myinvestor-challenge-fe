import type { OrderType, OrderLabel, OrderTone } from './order.types';

const ORDER_LABELS: Record<OrderType, OrderLabel> = {
  BUY: 'Compra',
  SELL: 'Venta',
  TRANSFER: 'Traspaso',
};

const ORDER_TONES: Record<OrderType, OrderTone> = {
  BUY: 'green',
  SELL: 'red',
  TRANSFER: 'blue',
};

const ORDER_SIGNS: Record<OrderType, string> = {
  BUY: '+',
  SELL: '-',
  TRANSFER: '',
};

export const getOrderTypeLabel = (type: OrderType): OrderLabel => ORDER_LABELS[type];
export const getOrderTypeTone = (type: OrderType): OrderTone => ORDER_TONES[type];
export const getOrderSign = (type: OrderType): string => ORDER_SIGNS[type];

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '---';

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
}

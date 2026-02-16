import type { Order, OrderView } from './order.types';
import { getOrderTypeLabel, getOrderTypeTone, getOrderSign, formatDate } from './order.utils';

export function mapOrderToView(order: Order): OrderView {
  return {
    id: order.id,
    fundName: order.fundName,
    fundDestinationName: order.fundDestinationName,
    quantityLabel: `${getOrderSign(order.type)} ${order.quantity}`,
    type: getOrderTypeLabel(order.type),
    tone: getOrderTypeTone(order.type),
    dateLabel: formatDate(order.createdAt),
  };
}

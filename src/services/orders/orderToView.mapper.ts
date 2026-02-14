import type { Order } from '@domain/orders/models';
import type { OrderViewModel } from '@services/orders/orderToView.api.types';
import { getOrderTypeLabel, formatDate, getOrderTypeTone, getOrderSign } from '@lib/orders';

export function mapOrderToView(order: Order): OrderViewModel {
  return {
    id: order.id,
    fundName: order.fundName,
    quantityLabel: `${getOrderSign(order.type)} ${order.quantity}`,
    type: getOrderTypeLabel(order.type),
    tone: getOrderTypeTone(order.type),
    dateLabel: formatDate(order.createdAt),
    ...(order.fundDestinationName && { fundDestinationName: order.fundDestinationName }),
  };
}

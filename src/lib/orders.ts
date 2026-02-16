import type { OrderType } from '@/domain/orders/models';
import type { OrderColors, OrderLabel } from '@services/orders/orderToView.api.types';

export function getOrderTypeLabel(type: OrderType): OrderLabel {
  switch (type) {
    case 'BUY':
      return 'Compra';
    case 'SELL':
      return 'Venta';
    case 'TRANSFER':
      return 'Traspaso';
  }
}

export function getOrderTypeTone(type: OrderType): OrderColors {
  switch (type) {
    case 'BUY':
      return 'green';
    case 'SELL':
      return 'red';
    case 'TRANSFER':
      return 'blue';
  }
}

export function getOrderSign(type: OrderType) {
  switch (type) {
    case 'BUY':
      return '+';
    case 'SELL':
      return '-';
    case 'TRANSFER':
      return '';
  }
}

export function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return '---';
  }

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(parsedDate));
}

import { describe, it, expect } from 'vitest';
import { mapOrderToView } from './orderToView.mapper';
import type { Order } from '@domain/orders/models';

describe('mapOrderToView', () => {
  it('transforma una orden de compra al formato de vista', () => {
    const order: Order = {
      id: 'order-1',
      fundName: 'Fondo Test',
      quantity: 100,
      type: 'BUY',
      createdAt: '2026-02-16T10:00:00Z',
    };

    const result = mapOrderToView(order);

    expect(result.id).toBe('order-1');
    expect(result.fundName).toBe('Fondo Test');
    expect(result.quantityLabel).toBe('+ 100');
    expect(result.type).toBe('Compra');
    expect(result.tone).toBe('green');
  });

  it('incluye fundDestinationName en traspasos', () => {
    const order: Order = {
      id: 'order-2',
      fundName: 'Fondo Origen',
      fundDestinationName: 'Fondo Destino',
      quantity: 50,
      type: 'TRANSFER',
      createdAt: '2026-02-16T10:00:00Z',
    };

    const result = mapOrderToView(order);

    expect(result.fundDestinationName).toBe('Fondo Destino');
    expect(result.type).toBe('Traspaso');
  });
});

/**
 * EJEMPLO: Cómo usar el sistema de mocks en tests
 *
 * MSW se configura automáticamente en setupTests.ts para Vitest.
 * Las factories (fishery + faker) generan datos tipados y realistas.
 */

import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { fundFactory } from '../../../mocks/factories';

describe('getFunds - ejemplo de uso de mocks', () => {
  it('debería obtener una lista de fondos', async () => {
    const { getFunds } = await import('../getFunds.api');
    const response = await getFunds(1, 10);

    expect(response.pagination).toBeDefined();
    expect(response.pagination.page).toBe(1);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  });
});

/**
 * EJEMPLO: Cómo usar factories para sobrescribir handlers
 *
 * fundFactory.build() genera un fondo tipado con datos realistas
 * fundFactory.buildList(n) genera n fondos
 */

describe('getFunds - usando factories para mocks personalizados', () => {
  it('debería retornar datos generados con factory', async () => {
    const mockFund = fundFactory.build({ name: 'Mi Fondo Test', category: 'TECH' });

    server.use(
      http.get('http://localhost:3000/funds', () => {
        return HttpResponse.json({
          data: [mockFund],
          pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        });
      })
    );

    const { getFunds } = await import('../getFunds.api');
    const response = await getFunds(1, 10);
    expect(response.data[0].name).toBe('Mi Fondo Test');
    expect(response.data[0].category).toBe('TECH');
  });

  it('debería probar paginación con múltiples fondos', async () => {
    const mockFunds = fundFactory.buildList(50);

    server.use(
      http.get('http://localhost:3000/funds', () => {
        return HttpResponse.json({
          data: mockFunds.slice(0, 10),
          pagination: { page: 1, limit: 10, total: 50, totalPages: 5 },
        });
      })
    );

    const { getFunds } = await import('../getFunds.api');
    const response = await getFunds(1, 10);
    expect(response.pagination.total).toBe(50);
  });

  it('debería manejar un error del servidor', async () => {
    server.use(
      http.get('http://localhost:3000/funds', () => {
        return HttpResponse.json({ error: 'Server Error' }, { status: 500 });
      })
    );

    const { getFunds } = await import('../getFunds.api');
    await expect(getFunds(1, 10)).rejects.toThrow('Error fetching funds');
  });
});

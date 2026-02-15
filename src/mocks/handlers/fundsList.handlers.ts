import { http, HttpResponse } from 'msw';
import type { GetFundsApiResponse, ApiFund } from '@domain/funds/types';
import { generateDeterministicFunds } from '../factories';

/**
 * Datos mock generados con faker + fishery.
 * Usamos seed fijo para que los tests sean determinísticos y reproducibles.
 * Total: 25 fondos para probar paginación realista.
 */
const mockFunds: ApiFund[] = generateDeterministicFunds(25);

export const fundListHandlers = [
  http.get('http://localhost:3000/funds', ({ request }) => {
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
    const limit = Number.parseInt(url.searchParams.get('limit') || '10', 10);
    const sort = url.searchParams.get('sort');

    const sortedFunds = [...mockFunds];
    if (sort) {
      const [field, direction] = sort.split(':');
      sortedFunds.sort((a, b) => {
        const aValue = a[field as keyof ApiFund];
        const bValue = b[field as keyof ApiFund];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction === 'desc' ? bValue - aValue : aValue - bValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }

        return 0;
      });
    }

    const total = sortedFunds.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = sortedFunds.slice(startIndex, startIndex + limit);

    const response: GetFundsApiResponse = {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return HttpResponse.json(response);
  }),
];

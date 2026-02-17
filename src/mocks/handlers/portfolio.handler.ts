import { http, HttpResponse } from 'msw';
import { getPortfolioItems } from '@mocks/store/portfolio.store';
import type { PortfolioResponseDto } from '@services/portfolio';

/**
 * Portfolio handler que lee del store mutable.
 * El estado se actualiza con las operaciones de buy/sell/transfer.
 */
export const portfolioHandlers = [
  http.get('http://localhost:3000/portfolio', () => {
    const items = getPortfolioItems();
    const response: PortfolioResponseDto = { data: items };
    return HttpResponse.json(response);
  }),
];

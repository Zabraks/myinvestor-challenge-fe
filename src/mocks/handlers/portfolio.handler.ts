import { http, HttpResponse } from 'msw';
import { getPortfolioItems } from '@mocks/store/portfolio.store';
import type { PortfolioResponseDto } from '@services/portfolio';

export const portfolioHandlers = [
  http.get('http://localhost:3000/portfolio', () => {
    const items = getPortfolioItems();
    const response: PortfolioResponseDto = { data: items };
    return HttpResponse.json(response);
  }),
];

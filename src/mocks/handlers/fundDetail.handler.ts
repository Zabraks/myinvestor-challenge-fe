import { http, HttpResponse } from 'msw';
import type { GetFundByIdApiResponse } from '@services/fund/fund.api.types';
import { generateDeterministicFunds } from '@mocks/factories';
import type { ApiFund } from '@domain/fund';

const mockFunds: ApiFund[] = generateDeterministicFunds(25);

export const fundDetailHandlers = [
  http.get('http://localhost:3000/funds/:id', ({ params }) => {
    const { id } = params;

    const fund = mockFunds.find((f) => f.id === id);

    if (!fund) {
      return HttpResponse.json({ error: 'Fund not found' }, { status: 404 });
    }

    const response: GetFundByIdApiResponse = {
      data: fund,
    };

    return HttpResponse.json(response);
  }),
];

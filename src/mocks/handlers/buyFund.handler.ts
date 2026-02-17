import { http, HttpResponse } from 'msw';
import { actionFactory, generateDeterministicFunds } from '@mocks/factories';
import { buyFund, getPortfolioItems } from '@mocks/store/portfolio.store';
import type { FundActionResponse, FundActionRequest } from '@services/fund-action';

const mockFunds = generateDeterministicFunds(25);

export const buyFundHandlers = [
  http.post('http://localhost:3000/funds/:id/buy', async ({ params, request }) => {
    const { id } = params;
    const fundId = id as string;
    const body = (await request.json()) as FundActionRequest;

    const fund = mockFunds.find((f) => f.id === fundId);
    const fundName = fund?.name ?? 'Unknown Fund';

    buyFund(fundId, fundName, body.quantity);

    const portfolio = getPortfolioItems();

    const response = actionFactory.build({
      data: {
        portfolio: portfolio.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      },
    }) as FundActionResponse;

    return HttpResponse.json(response, { status: 201 });
  }),
];

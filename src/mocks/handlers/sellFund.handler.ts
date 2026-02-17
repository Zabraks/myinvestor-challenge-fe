import { http, HttpResponse } from 'msw';
import { actionFactory } from '@mocks/factories';
import { sellFund, getPortfolioItems } from '@mocks/store/portfolio.store';
import type { FundActionResponse, FundActionRequest } from '@services/fund-action';

export const sellFundHandlers = [
  http.post('http://localhost:3000/funds/:id/sell', async ({ params, request }) => {
    const { id } = params;
    const fundId = id as string;
    const body = (await request.json()) as FundActionRequest;

    sellFund(fundId, body.quantity);

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

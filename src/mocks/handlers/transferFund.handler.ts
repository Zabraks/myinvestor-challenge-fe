import { http, HttpResponse } from 'msw';
import { actionFactory, generateDeterministicFunds } from '@mocks/factories';
import { transferFund, getPortfolioItems } from '@mocks/store/portfolio.store';
import type { FundActionResponse, TransferFundActionRequest } from '@services/fund-action';

const mockFunds = generateDeterministicFunds(25);

export const transferFundHandlers = [
  http.post('http://localhost:3000/funds/transfer', async ({ request }) => {
    const body = (await request.json()) as TransferFundActionRequest;

    const toFund = mockFunds.find((f) => f.id === body.toFundId);
    const toFundName = toFund?.name ?? 'Unknown Fund';

    transferFund(body.fromFundId, body.toFundId, toFundName, body.quantity);

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

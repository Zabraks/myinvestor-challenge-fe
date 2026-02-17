import { http, HttpResponse } from 'msw';
import { actionFactory } from '@mocks/factories';
import type { FundActionResponse } from '@/services';

export const buyFundHandlers = [
  http.post('http://localhost:3000/funds/:id/buy', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { amount: number };

    const response = actionFactory.build({
      data: {
        portfolio: [
          {
            id: id as string,
            quantity: body.amount,
          },
        ],
      },
    }) as FundActionResponse;

    return HttpResponse.json(response, { status: 201 });
  }),
];

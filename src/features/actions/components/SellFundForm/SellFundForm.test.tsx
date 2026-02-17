import { screen, waitFor, render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import { QueryClientProvider } from '@tanstack/react-query';
import { actionFactory } from '@mocks/factories';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { queryClient } from '@lib/queryClient';
import { MESSAGES } from '@domain/action';
import { Toaster } from '@ui/Sonner/Sonner';

import { FundActionDialog } from '@features/actions/components/FundActionDialog/FundActionDialog';

import type { FundActionResponse } from '@services/fund-action';
import type { ActionData } from '@domain/action';

const MAX_QUANTITY = 100;

const mockData: ActionData = {
  id: '1',
  name: 'Test Fund',
  quantity: MAX_QUANTITY,
};

const renderSellFundForm = () => {
  const user = userEvent.setup();

  const result = render(
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <FundActionDialog
        open={true}
        action="sell"
        data={mockData}
        fundId="1"
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
      />
    </QueryClientProvider>
  );

  return { user, ...result };
};

const updateInput = async (user: ReturnType<typeof userEvent.setup>, value?: string) => {
  const input = await screen.findByLabelText(/Valor/i);
  await user.clear(input);
  value && (await user.type(input, value));
};

const sendForm = async (user: ReturnType<typeof userEvent.setup>) => {
  const sendButton = screen.getByRole('button', { name: /Enviar/i });
  await user.click(sendButton);
};

describe('SellFundForm', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should show sellFundForm with quantity available', async () => {
    renderSellFundForm();

    const input = await screen.findByLabelText(/Valor/i);
    const quantityText = screen.getByText(`Cantidad disponible:`);

    expect(input).toBeInTheDocument();
    expect(quantityText).toBeInTheDocument();
    expect(screen.getByText(MAX_QUANTITY.toString())).toBeInTheDocument();
  });

  it('should sell a fund successfully', async () => {
    let capturedPayload: { quantity: number };
    let capturedFundId: string;

    server.use(
      http.post('http://localhost:3000/funds/:id/sell', async ({ request, params }) => {
        capturedFundId = params.id as string;
        capturedPayload = (await request.json()) as { quantity: number };

        const mockResponse = actionFactory.build({
          data: {
            portfolio: [{ id: capturedFundId, quantity: capturedPayload.quantity }],
          },
        }) as FundActionResponse;

        return HttpResponse.json(mockResponse);
      })
    );

    const { user } = renderSellFundForm();

    await updateInput(user, '50');
    await sendForm(user);

    await waitFor(() => {
      expect(capturedPayload).toEqual({ quantity: 50 });
    });

    const successMessage = await screen.findByText('El fondo se ha vendido correctamente');
    expect(successMessage).toBeInTheDocument();
  });

  it('should not sell fund cause input is empty', async () => {
    const { user } = renderSellFundForm();

    await updateInput(user);
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not sell fund cause input value is negative', async () => {
    const { user } = renderSellFundForm();

    await updateInput(user, '-50');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.positive);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not sell fund cause input value exceeds max quantity', async () => {
    const { user } = renderSellFundForm();

    await updateInput(user, '150');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.sellMax(MAX_QUANTITY));
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not sell fund cause input value is a string', async () => {
    const { user } = renderSellFundForm();

    await updateInput(user, 'test');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
  });
});

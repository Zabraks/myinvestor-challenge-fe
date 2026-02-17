import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { actionFactory } from '@mocks/factories';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { queryClient } from '@lib/queryClient';
import { MESSAGES } from '@domain/action';

import {
  renderFundsTableWithProvider,
  getBuyFundForm,
  updateInput,
  sendForm,
} from '../Actions.test-utils';

import type { FundActionResponse } from '@services/fund-action';

describe('BuyFundForm', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should show buyFundForm in dialog', async () => {
    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);
    const input = await screen.findByLabelText(/Valor/i);

    expect(input).toBeInTheDocument();
  });

  it('should buy a fund successfully', async () => {
    let capturedPayload: { quantity: number };
    let capturedFundId: string;

    server.use(
      http.post('http://localhost:3000/funds/:id/buy', async ({ request, params }) => {
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

    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);

    await updateInput(user, '100');
    await sendForm(user);

    await waitFor(() => {
      expect(capturedPayload).toEqual({ quantity: 100 });
    });

    const successMessage = await screen.findByText('El fondo se ha comprado correctamente');
    expect(successMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should not buy fund cause input is empty', async () => {
    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);

    await updateInput(user);
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not buy fund cause input value is negative', async () => {
    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);

    await updateInput(user, '-100');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.positive);
    expect(errorMsg).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not buy fund cause input value is up to max value', async () => {
    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);

    await updateInput(user, '1000000');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.buyMax);
    expect(errorMsg).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not buy fund cause input value is a string', async () => {
    const { user } = renderFundsTableWithProvider();
    await getBuyFundForm(user);

    await updateInput(user, 'test');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });
});

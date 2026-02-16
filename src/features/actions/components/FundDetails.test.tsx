import { screen, waitFor, within, render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { fundFactory } from '@mocks/factories';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { queryClient } from '@lib/queryClient';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';

import { renderFundsTableWithProvider } from './Actions.test-utils';
import { FundDetails } from './FundDetails';
import { Dialog, DialogContent } from '@ui/Dialog/Dialog';

describe('FundDetails', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  const openFundDetails = async (
    user: ReturnType<typeof import('@testing-library/user-event').default.setup>
  ) => {
    const actionsButton = screen.getAllByRole('button', { name: /abrir menu/i })[0];
    await user.click(actionsButton);

    const viewDetailsOption = await screen.findByRole('menuitem', { name: /Ver detalle/i });
    await user.click(viewDetailsOption);
  };

  it('should show fund details in dialog', async () => {
    const mockFund = fundFactory.build({
      id: '1',
      name: 'Unique Test Fund XYZ',
      symbol: 'UTX',
      category: 'TECH',
      currency: 'EUR',
      value: 12500.5,
      profitability: {
        YTD: 5.25,
        oneYear: 12.5,
        threeYears: 35.0,
        fiveYears: 65.0,
      },
    });

    server.use(
      http.get('http://localhost:3000/funds/:id', () => {
        return HttpResponse.json({ data: mockFund });
      })
    );

    const { user } = renderFundsTableWithProvider();
    await openFundDetails(user);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Detalles del fondo/i)).toBeInTheDocument();

    expect(await within(dialog).findByText(/Unique Test Fund XYZ/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/UTX/i)).toBeInTheDocument();

    expect(within(dialog).getByText(/Rentabilidad/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Año hasta la fecha/i)).toBeInTheDocument();
  });

  it('should show error state when API fails', async () => {
    const testQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    server.use(
      http.get('http://localhost:3000/funds/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <QueryClientProvider client={testQueryClient}>
        <FundActionDialogProvider>
          <Dialog open>
            <DialogContent>
              <FundDetails fundId="1" />
            </DialogContent>
          </Dialog>
        </FundActionDialogProvider>
      </QueryClientProvider>
    );

    const dialog = await screen.findByRole('dialog');
    expect(await within(dialog).findByText('Error')).toBeInTheDocument();
    expect(within(dialog).getByText(/Ha habido un error/i)).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: /Cerrar/i })).toBeInTheDocument();
  });

  it('should close dialog when clicking close button', async () => {
    const mockFund = fundFactory.build({ name: 'Closable Fund ABC' });

    server.use(
      http.get('http://localhost:3000/funds/:id', () => {
        return HttpResponse.json({ data: mockFund });
      })
    );

    const { user } = renderFundsTableWithProvider();
    await openFundDetails(user);

    const dialog = await screen.findByRole('dialog');
    await within(dialog).findByText(/Closable Fund ABC/i);

    const closeButton = within(dialog).getByRole('button', { name: /Cerrar/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

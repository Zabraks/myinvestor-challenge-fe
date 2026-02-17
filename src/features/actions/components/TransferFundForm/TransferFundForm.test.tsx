import { screen, render } from '@testing-library/react';
import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import { QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { queryClient } from '@lib/queryClient';
import { MESSAGES } from '@domain/action';
import { Toaster } from '@ui/Sonner/Sonner';

import { FundActionDialog } from '@features/actions/components/FundActionDialog/FundActionDialog';

import type { ActionData } from '@domain/action';
import type { PortfolioResponseDto } from '@services/portfolio';

const MAX_QUANTITY = 100;
const SOURCE_FUND_ID = '1';
const TARGET_FUND_ID = '2';

const mockData: ActionData = {
  id: SOURCE_FUND_ID,
  name: 'Source Fund',
  quantity: MAX_QUANTITY,
};

const mockPortfolioResponse: PortfolioResponseDto = {
  data: [
    { id: SOURCE_FUND_ID, name: 'Source Fund', quantity: 100, totalValue: 15000 },
    { id: TARGET_FUND_ID, name: 'Target Fund', quantity: 50, totalValue: 7500 },
    { id: '3', name: 'Third Fund', quantity: 75, totalValue: 11250 },
  ],
};

const portfolioHandler = http.get('http://localhost:3000/portfolio', () => {
  return HttpResponse.json(mockPortfolioResponse);
});

const renderTransferFundForm = () => {
  const user = userEvent.setup();

  const result = render(
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <FundActionDialog
        open={true}
        action="transfer"
        data={mockData}
        fundId={SOURCE_FUND_ID}
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

describe('TransferFundForm', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    queryClient.clear();
    server.use(portfolioHandler);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should show transferFundForm with quantity available', async () => {
    renderTransferFundForm();

    const input = await screen.findByLabelText(/Valor/i);
    const quantityText = screen.getByText(`Cantidad disponible:`);

    expect(input).toBeInTheDocument();
    expect(quantityText).toBeInTheDocument();
    expect(screen.getByText(MAX_QUANTITY.toString())).toBeInTheDocument();
  });

  it('should render select for target fund', async () => {
    renderTransferFundForm();

    const selectTrigger = await screen.findByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();

    expect(
      screen.getByText(/Elige un fondo disponible para realizar el traspaso/i)
    ).toBeInTheDocument();
  });

  it('should not transfer fund cause input is empty', async () => {
    const { user } = renderTransferFundForm();

    await updateInput(user);
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not transfer fund cause input value is negative', async () => {
    const { user } = renderTransferFundForm();

    await updateInput(user, '-50');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.positive);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not transfer fund cause input value exceeds max quantity', async () => {
    const { user } = renderTransferFundForm();

    await updateInput(user, '150');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.transferMax(MAX_QUANTITY));
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not transfer fund cause no target fund selected', async () => {
    const { user } = renderTransferFundForm();

    await updateInput(user, '50');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.fundRequired);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not transfer fund cause input value is a string', async () => {
    const { user } = renderTransferFundForm();

    await updateInput(user, 'test');
    await sendForm(user);

    const errorMsg = await screen.findByText(MESSAGES.numberRequired);
    expect(errorMsg).toBeInTheDocument();
  });
});

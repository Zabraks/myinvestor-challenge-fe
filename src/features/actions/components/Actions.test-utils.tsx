import { screen, within, render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient';
import { Toaster } from '@ui/Sonner/Sonner';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';

import userEvent from '@testing-library/user-event';

import {
  generateTestFunds,
  FundsTableIntegration,
} from '@features/fundsList/components/FundsTable/__tests__/FundsTable.test-utils';

export const renderFundsTableWithProvider = () => {
  const user = userEvent.setup();

  const funds = generateTestFunds(5);
  const pageSize = 10;

  const result = render(
    <QueryClientProvider client={queryClient}>
      <FundActionDialogProvider>
        <Toaster />
        <FundsTableIntegration initialData={funds} pageSize={pageSize} />
      </FundActionDialogProvider>
    </QueryClientProvider>
  );

  return {
    user,
    ...result,
  };
};

export const getBuyFundForm = async (user) => {
  const rows = screen.getAllByRole('row');

  const firstDataRow = rows[1];

  const actionsButton = within(firstDataRow).getByRole('button', {
    name: /abrir menu/i,
  });

  await user.click(actionsButton);
  const buyOption = await screen.findByRole('menuitem', { name: /Comprar/i });
  await user.click(buyOption);
};

export const updateInput = async (user, value?: string) => {
  const input = await screen.findByLabelText(/Valor/i);
  await user.clear(input);
  value && (await user.type(input, value));
};

export const sendForm = async (user) => {
  const sendButton = screen.getByRole('button', { name: /Enviar/i });
  await user.click(sendButton);
};

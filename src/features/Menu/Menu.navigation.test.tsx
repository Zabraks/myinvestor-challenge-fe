import { screen, render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@mocks/server';
import { Toaster } from '@ui/Sonner/Sonner';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { ActionMenuProvider } from '@context/ActionMenuContext';
import { generateDeterministicFunds } from '@mocks/factories';
import { generatePortfolioWithCategories } from '@mocks/factories/portfolio.factory';

import App from '@app/App';

const mockFunds = generateDeterministicFunds(10);
const mockPortfolio = generatePortfolioWithCategories(3);

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderApp = (initialRoute = '/funds') => {
  const user = userEvent.setup();
  const queryClient = createQueryClient();

  const result = render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <QueryClientProvider client={queryClient}>
        <ActionMenuProvider>
          <FundActionDialogProvider>
            <Toaster />
            <App />
          </FundActionDialogProvider>
        </ActionMenuProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  return { user, queryClient, ...result };
};

const setupMocks = () => {
  server.use(
    http.get('http://localhost:3000/funds', () => {
      return HttpResponse.json({
        data: mockFunds,
        pagination: { page: 1, limit: 10, total: mockFunds.length, totalPages: 1 },
      });
    }),
    http.get('http://localhost:3000/portfolio', () => {
      return HttpResponse.json(mockPortfolio);
    })
  );
};

describe('Menu - Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupMocks();
  });

  it('should navigate from funds to portfolio', async () => {
    const { user } = renderApp('/funds');

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const portfolioLink = screen.getByRole('link', { name: /portfolio/i });

    await user.click(portfolioLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mis fondos/i })).toBeInTheDocument();
    });
  });

  it('should navigate from portfolio to funds', async () => {
    const { user } = renderApp('/portfolio');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mis fondos/i })).toBeInTheDocument();
    });

    const fondosLink = screen.getByRole('link', { name: /fondos/i });

    await user.click(fondosLink);

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  it('should be selected the correct page item', async () => {
    const { user } = renderApp('/funds');

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const portfolioLink = screen.getByRole('link', { name: /portfolio/i });
    const fondosLink = screen.getByRole('link', { name: /fondos/i });

    expect(fondosLink).toHaveAttribute('data-active', 'true');
    expect(portfolioLink).not.toHaveAttribute('data-active');

    await user.click(portfolioLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mis fondos/i })).toBeInTheDocument();
    });

    expect(portfolioLink).toHaveAttribute('data-active', 'true');
    expect(fondosLink).not.toHaveAttribute('data-active');
  });
});

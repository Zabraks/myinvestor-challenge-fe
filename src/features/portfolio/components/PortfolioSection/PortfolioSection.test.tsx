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
import {
  generatePortfolioWithCategories,
  generateEmptyPortfolio,
} from '@mocks/factories/portfolio.factory';

import Portfolio from '@pages/Portfolio';

import type { PortfolioResponseDto } from '@services/portfolio';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockFunds = generateDeterministicFunds(10);

const renderPortfolioPage = () => {
  const user = userEvent.setup();

  const result = render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ActionMenuProvider>
          <FundActionDialogProvider>
            <Toaster />
            <Portfolio />
          </FundActionDialogProvider>
        </ActionMenuProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  return { user, ...result };
};

const setupMocks = (portfolioResponse: PortfolioResponseDto) => {
  server.use(
    http.get('http://localhost:3000/portfolio', () => {
      return HttpResponse.json(portfolioResponse);
    }),
    http.get('http://localhost:3000/funds', () => {
      return HttpResponse.json({
        data: mockFunds,
        pagination: { page: 1, limit: 100, total: mockFunds.length, totalPages: 1 },
      });
    })
  );
};

describe('Portfolio - Lista de fondos', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('should render categorized portfolio items', async () => {
    const portfolioData = generatePortfolioWithCategories(2);
    setupMocks(portfolioData);

    renderPortfolioPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Mis fondos/i })).toBeInTheDocument();
    });

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should show empty state when no funds in portfolio', async () => {
    const emptyPortfolio = generateEmptyPortfolio();
    setupMocks(emptyPortfolio);

    renderPortfolioPage();

    await waitFor(() => {
      expect(screen.getByText(/Aún no tienes fondos en tu cartera/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Ver fondos disponibles/i })).toBeInTheDocument();
  });
});

describe('Portfolio - Acciones', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('should render portfolio items with fund details', async () => {
    const portfolioData = generatePortfolioWithCategories(1);
    setupMocks(portfolioData);

    renderPortfolioPage();

    await screen.findByRole('heading', { name: /Mis fondos/i });

    await waitFor(
      () => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });
});

describe('Portfolio - Tab Órdenes', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('should switch to orders tab', async () => {
    const portfolioData = generatePortfolioWithCategories(1);
    setupMocks(portfolioData);

    const { user } = renderPortfolioPage();

    await screen.findByRole('heading', { name: /Mis fondos/i });

    const ordersTab = screen.getByRole('tab', { name: /Órdenes/i });
    await user.click(ordersTab);

    expect(await screen.findByRole('heading', { name: /Ordenes/i })).toBeInTheDocument();
  });

  it('should show empty orders state', async () => {
    const portfolioData = generatePortfolioWithCategories(1);
    setupMocks(portfolioData);

    const { user } = renderPortfolioPage();

    await screen.findByRole('heading', { name: /Mis fondos/i });

    const ordersTab = screen.getByRole('tab', { name: /Órdenes/i });
    await user.click(ordersTab);

    await waitFor(() => {
      expect(screen.getByText(/Aún no se han registrado operaciones/i)).toBeInTheDocument();
    });
  });

  it('should show orders when available', async () => {
    const portfolioData = generatePortfolioWithCategories(1);
    setupMocks(portfolioData);

    queryClient.setQueryData(
      ['orders'],
      [
        {
          id: 'order-001',
          type: 'SELL',
          fundId: '1',
          fundName: 'Test Fund',
          quantity: 50,
          createdAt: new Date().toISOString(),
        },
      ]
    );

    const { user } = renderPortfolioPage();

    await screen.findByRole('heading', { name: /Mis fondos/i });

    const ordersTab = screen.getByRole('tab', { name: /Órdenes/i });
    await user.click(ordersTab);

    await waitFor(() => {
      expect(screen.getByText(/Test Fund/i)).toBeInTheDocument();
    });
  });
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';
import { FundDetails } from './FundDetails';
import type { ApiFund } from '@domain/fund';

const mockFund: ApiFund = {
  id: 'fund-story-001',
  name: 'Global Tech Growth Fund',
  category: 'TECH',
  currency: 'EUR',
  value: 125000.5,
  symbol: 'GTG',
  profitability: {
    YTD: 8.5,
    oneYear: 12.3,
    threeYears: 25.7,
    fiveYears: 45.2,
  },
};

const meta: Meta<typeof FundDetails> = {
  title: 'Features/Actions/FundDetails',
  component: FundDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Dialog open>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Detalles del fondo</DialogTitle>
              </DialogHeader>
              <Story />
            </DialogContent>
          </Dialog>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fundId: mockFund.id,
    action: 'show',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/funds/:id', () => {
          return HttpResponse.json({ data: mockFund });
        }),
      ],
    },
  },
};

export const Error: Story = {
  args: {
    fundId: 'fund-error',
    action: 'show',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/funds/:id', () => {
          return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
        }),
      ],
    },
  },
};

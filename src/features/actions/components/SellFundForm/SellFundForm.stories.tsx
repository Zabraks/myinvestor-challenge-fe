import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';
import { SellFundForm } from './SellFundForm';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const meta: Meta<typeof SellFundForm> = {
  title: 'Features/Actions/SellFundForm',
  component: SellFundForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Dialog open>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Vender fondo</DialogTitle>
            </DialogHeader>
            <Story />
          </DialogContent>
        </Dialog>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: 'sell',
    data: {
      id: 'fund-2',
      name: 'Fondo Salud Europa',
      value: 89.25,
      YTD: 3.2,
      quantity: 10,
    },
    onSuccess: () => {},
  },
};

export const SingleUnit: Story = {
  args: {
    action: 'sell',
    data: {
      id: 'fund-3',
      name: 'Fondo Monetario Seguro',
      value: 10.05,
      YTD: 0.5,
      quantity: 1,
    },
    onSuccess: () => {},
  },
};

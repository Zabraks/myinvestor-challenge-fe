import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';
import { BuyFundForm } from './BuyFundForm';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const meta: Meta<typeof BuyFundForm> = {
  title: 'Features/Actions/BuyFundForm',
  component: BuyFundForm,
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
              <DialogTitle>Comprar fondo</DialogTitle>
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
    action: 'buy',
    data: {
      id: 'fund-1',
      name: 'Fondo Global Tech',
      value: 125.5,
      YTD: 8.5,
    },
    onSuccess: () => {},
  },
};

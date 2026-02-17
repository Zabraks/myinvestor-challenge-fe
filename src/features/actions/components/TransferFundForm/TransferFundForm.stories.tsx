import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';
import { TransferFundForm } from './TransferFundForm';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const meta: Meta<typeof TransferFundForm> = {
  title: 'Features/Actions/TransferFundForm',
  component: TransferFundForm,
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
              <DialogTitle>Traspasar fondo</DialogTitle>
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
    action: 'transfer',
    fundId: 'fund-1',
    data: {
      id: 'fund-1',
      name: 'Fondo Global Tech',
      value: 125.5,
      YTD: 8.5,
      quantity: 100,
    },
    onSuccess: () => {},
  },
};

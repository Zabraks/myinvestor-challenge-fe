import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderList } from './OrderList';
import type { OrderView } from '@domain/order';

const mockOrders: OrderView[] = [
  {
    id: 'order-1',
    fundName: 'Fondo Global Tech',
    type: 'Compra',
    tone: 'green',
    quantityLabel: '+150',
    dateLabel: '15/02/2026 10:30',
  },
  {
    id: 'order-2',
    fundName: 'Fondo Salud Europa',
    type: 'Venta',
    tone: 'red',
    quantityLabel: '-50',
    dateLabel: '14/02/2026 15:45',
  },
  {
    id: 'order-3',
    fundName: 'Fondo Monetario Seguro',
    fundDestinationName: 'Fondo Global Tech',
    type: 'Traspaso',
    tone: 'blue',
    quantityLabel: '100',
    dateLabel: '13/02/2026 09:15',
  },
  {
    id: 'order-4',
    fundName: 'Fondo AI Innovation',
    type: 'Compra',
    tone: 'green',
    quantityLabel: '+75',
    dateLabel: '12/02/2026 11:00',
  },
];

const meta: Meta<typeof OrderList> = {
  title: 'Features/Orders/OrderList',
  component: OrderList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: mockOrders,
  },
};

export const OnlyBuys: Story = {
  args: {
    items: mockOrders.filter((o) => o.type === 'Compra'),
  },
};

export const SingleTransfer: Story = {
  args: {
    items: [mockOrders[2]],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const ManyOrders: Story = {
  args: {
    items: [
      ...mockOrders,
      {
        id: 'order-5',
        fundName: 'Fondo Index SP500',
        type: 'Compra',
        tone: 'green' as const,
        quantityLabel: '+200',
        dateLabel: '11/02/2026 14:30',
      },
      {
        id: 'order-6',
        fundName: 'Fondo Renta Fija',
        type: 'Venta',
        tone: 'red' as const,
        quantityLabel: '-100',
        dateLabel: '10/02/2026 16:00',
      },
      {
        id: 'order-7',
        fundName: 'Fondo Emergentes',
        fundDestinationName: 'Fondo Index SP500',
        type: 'Traspaso',
        tone: 'blue' as const,
        quantityLabel: '50',
        dateLabel: '09/02/2026 10:00',
      },
    ],
  },
};

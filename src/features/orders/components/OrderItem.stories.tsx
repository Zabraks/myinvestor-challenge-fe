import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderItem } from './OrderItem';
import type { OrderView } from '@domain/order';

const meta: Meta<typeof OrderItem> = {
  title: 'Features/Orders/OrderItem',
  component: OrderItem,
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

export const BuyOrder: Story = {
  args: {
    item: {
      id: 'order-1',
      fundName: 'Fondo Global Tech',
      type: 'Compra',
      tone: 'green',
      quantityLabel: '+150',
      dateLabel: '15/02/2026 10:30',
    } as OrderView,
  },
};

export const SellOrder: Story = {
  args: {
    item: {
      id: 'order-2',
      fundName: 'Fondo Salud Europa',
      type: 'Venta',
      tone: 'red',
      quantityLabel: '-50',
      dateLabel: '14/02/2026 15:45',
    } as OrderView,
  },
};

export const TransferOrder: Story = {
  args: {
    item: {
      id: 'order-3',
      fundName: 'Fondo Monetario Seguro',
      fundDestinationName: 'Fondo Global Tech',
      type: 'Traspaso',
      tone: 'blue',
      quantityLabel: '100',
      dateLabel: '13/02/2026 09:15',
    } as OrderView,
  },
};

export const LongFundName: Story = {
  args: {
    item: {
      id: 'order-4',
      fundName: 'Fondo de Inversión Renta Variable Internacional con Gestión Activa',
      type: 'Compra',
      tone: 'green',
      quantityLabel: '+25',
      dateLabel: '12/02/2026 11:00',
    } as OrderView,
  },
};

export const HighQuantity: Story = {
  args: {
    item: {
      id: 'order-5',
      fundName: 'Fondo Index SP500',
      type: 'Compra',
      tone: 'green',
      quantityLabel: '+10000',
      dateLabel: '11/02/2026 14:30',
    } as OrderView,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioItem } from './PortfolioItem';
import { ActionMenuProvider } from '@context/ActionMenuContext';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import type { DisplayPortfolioItem } from '@domain/portfolio';

const mockItem: DisplayPortfolioItem = {
  id: 'fund-1',
  name: 'Fondo Global Tech',
  quantity: 150,
  totalValue: '18.750,00 €',
  category: 'TECH',
};

const meta: Meta<typeof PortfolioItem> = {
  title: 'Features/Portfolio/PortfolioItem',
  component: PortfolioItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ActionMenuProvider>
          <FundActionDialogProvider>
            <div className="w-[400px]">
              <Story />
            </div>
          </FundActionDialogProvider>
        </ActionMenuProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: mockItem,
  },
};

export const HealthFund: Story = {
  args: {
    item: {
      id: 'fund-2',
      name: 'Fondo Salud Europa',
      quantity: 200,
      totalValue: '17.850,00 €',
      category: 'HEALTH',
    },
  },
};

export const MoneyMarketFund: Story = {
  args: {
    item: {
      id: 'fund-3',
      name: 'Fondo Monetario Seguro',
      quantity: 500,
      totalValue: '5.025,00 €',
      category: 'MONEY_MARKET',
    },
  },
};

export const LongName: Story = {
  args: {
    item: {
      id: 'fund-4',
      name: 'Fondo de Inversión Renta Variable Internacional con Gestión Activa',
      quantity: 50,
      totalValue: '12.500,00 €',
      category: 'GLOBAL',
    },
  },
};

export const HighQuantity: Story = {
  args: {
    item: {
      id: 'fund-5',
      name: 'Fondo Index SP500',
      quantity: 10000,
      totalValue: '1.250.000,00 €',
      category: 'GLOBAL',
    },
  },
};

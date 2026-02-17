import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioList } from './PortfolioList';
import { ActionMenuProvider } from '@context/ActionMenuContext';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import type { DisplayPortfolioItem, CategoryGroup } from '@domain/portfolio';

const mockPortfolioData: CategoryGroup<DisplayPortfolioItem>[] = [
  {
    nameCategory: 'Tecnología',
    items: [
      {
        id: 'fund-1',
        name: 'Fondo Global Tech',
        quantity: 150,
        totalValue: '18.750,00 €',
        category: 'TECH',
      },
      {
        id: 'fund-2',
        name: 'Fondo AI Innovation',
        quantity: 75,
        totalValue: '9.375,00 €',
        category: 'TECH',
      },
    ],
  },
  {
    nameCategory: 'Salud',
    items: [
      {
        id: 'fund-3',
        name: 'Fondo Salud Europa',
        quantity: 200,
        totalValue: '17.850,00 €',
        category: 'HEALTH',
      },
    ],
  },
  {
    nameCategory: 'Monetario',
    items: [
      {
        id: 'fund-4',
        name: 'Fondo Monetario Seguro',
        quantity: 500,
        totalValue: '5.025,00 €',
        category: 'MONEY_MARKET',
      },
    ],
  },
];

const meta: Meta<typeof PortfolioList> = {
  title: 'Features/Portfolio/PortfolioList',
  component: PortfolioList,
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
    items: mockPortfolioData,
  },
};

export const SingleCategory: Story = {
  args: {
    items: [mockPortfolioData[0]],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const ManyFunds: Story = {
  args: {
    items: [
      {
        nameCategory: 'Global',
        items: [
          {
            id: '1',
            name: 'Fondo Global A',
            quantity: 100,
            totalValue: '10.000,00 €',
            category: 'GLOBAL',
          },
          {
            id: '2',
            name: 'Fondo Global B',
            quantity: 150,
            totalValue: '15.000,00 €',
            category: 'GLOBAL',
          },
          {
            id: '3',
            name: 'Fondo Global C',
            quantity: 200,
            totalValue: '20.000,00 €',
            category: 'GLOBAL',
          },
          {
            id: '4',
            name: 'Fondo Global D',
            quantity: 250,
            totalValue: '25.000,00 €',
            category: 'GLOBAL',
          },
          {
            id: '5',
            name: 'Fondo Global E',
            quantity: 300,
            totalValue: '30.000,00 €',
            category: 'GLOBAL',
          },
        ],
      },
    ],
  },
};

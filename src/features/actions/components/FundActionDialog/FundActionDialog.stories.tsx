import type { Meta, StoryObj } from '@storybook/react-vite';
import { FundActionDialog } from './FundActionDialog';

/**
 * FundActionDialog es un diálogo modal que se muestra para realizar
 * diferentes acciones sobre un fondo: comprar, vender, traspasar o ver detalles.
 */
const meta: Meta<typeof FundActionDialog> = {
  title: 'Features/Actions/FundActionDialog',
  component: FundActionDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: () => undefined,
    fund: {
      id: '1',
      name: 'Fondo de Inversión Global',
      value: 15.5,
      YTD: 8.5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FundActionDialog>;

/**
 * Diálogo para comprar un fondo.
 */
export const BuyAction: Story = {
  args: {
    open: true,
    action: 'buy',
  },
};

/**
 * Diálogo para vender un fondo.
 */
export const SellAction: Story = {
  args: {
    open: true,
    action: 'sell',
  },
};

/**
 * Diálogo para traspasar un fondo.
 */
export const TransferAction: Story = {
  args: {
    open: true,
    action: 'transfer',
  },
};

/**
 * Diálogo para ver detalles de un fondo.
 */
export const ShowDetails: Story = {
  args: {
    open: true,
    action: 'show',
  },
};

/**
 * Diálogo cerrado (no visible).
 */
export const Closed: Story = {
  args: {
    open: false,
    action: 'buy',
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { LimitPageSelector } from './LimitPageSelector';

/**
 * LimitPageSelector es un componente que permite al usuario seleccionar
 * cuántos elementos mostrar por página. Al cambiar el límite, también
 * resetea la página a 1.
 */
const meta: Meta<typeof LimitPageSelector> = {
  title: 'Features/FundsList/LimitPageSelector',
  component: LimitPageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    setPage: () => undefined,
    setLimit: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof LimitPageSelector>;

/**
 * Estado por defecto del selector de límite de página.
 * Por defecto muestra 10 elementos.
 */
export const Default: Story = {};

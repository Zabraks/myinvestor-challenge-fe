import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import EmptyPortfolio from './EmptyPortfolio';

/**
 * EmptyPortfolio es un componente que se muestra cuando el usuario
 * no tiene fondos en su cartera. Incluye un botón para navegar
 * a la lista de fondos disponibles.
 */
const meta: Meta<typeof EmptyPortfolio> = {
  title: 'Features/Portfolio/EmptyPortfolio',
  component: EmptyPortfolio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyPortfolio>;

/**
 * Estado por defecto del componente EmptyPortfolio.
 */
export const Default: Story = {};

/**
 * Vista del componente dentro de un contenedor más amplio
 * para simular su apariencia en una página real.
 */
export const InContainer: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-100 w-full border rounded-lg flex items-center justify-center">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

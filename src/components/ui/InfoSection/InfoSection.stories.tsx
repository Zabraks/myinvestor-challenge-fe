import type { Meta, StoryObj } from '@storybook/react-vite';
import { PackageOpen, AlertCircle } from 'lucide-react';
import { InfoSection } from './InfoSection';

const meta: Meta<typeof InfoSection> = {
  title: 'UI/InfoSection',
  component: InfoSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No hay elementos',
    description: 'No se encontraron elementos para mostrar.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Tu cartera está vacía',
    description: 'Aún no tienes fondos en tu cartera. Explora los fondos disponibles.',
    buttonText: 'Ver fondos',
    action: () => {},
    icon: <PackageOpen className="size-5" />,
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Error',
    description: 'Ha ocurrido un error al cargar los datos.',
    buttonText: 'Reintentar',
    action: () => {},
    icon: <AlertCircle className="size-5" />,
  },
};

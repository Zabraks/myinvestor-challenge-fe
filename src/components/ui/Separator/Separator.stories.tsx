import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del separador',
    },
    decorative: {
      control: 'boolean',
      description: 'Si es decorativo (no semántico)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          Una librería de componentes UI de código abierto.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Instalación</h4>
        <p className="text-sm text-muted-foreground">
          Cómo instalar dependencias y estructurar tu aplicación.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <span>Blog</span>
      <Separator {...args} />
      <span>Docs</span>
      <Separator {...args} />
      <span>Código</span>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center space-x-4 text-sm">
      <span className="cursor-pointer font-medium text-foreground">Inicio</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="cursor-pointer text-muted-foreground hover:text-foreground">Fondos</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="cursor-pointer text-muted-foreground hover:text-foreground">Cartera</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="cursor-pointer text-muted-foreground hover:text-foreground">Perfil</span>
    </nav>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Fondo MyInvestor Value</span>
        <span className="text-sm text-muted-foreground">ES0000000001</span>
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Valor liquidativo</span>
          <p className="font-medium">124.56 €</p>
        </div>
        <div>
          <span className="text-muted-foreground">Rentabilidad YTD</span>
          <p className="font-medium text-green-600">+8.45%</p>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="flex justify-end gap-2">
        <button className="text-sm text-primary hover:underline">Ver detalles</button>
      </div>
    </div>
  ),
};

export const MultipleHorizontal: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span>Elemento 1</span>
        <span className="text-muted-foreground">Valor 1</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span>Elemento 2</span>
        <span className="text-muted-foreground">Valor 2</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span>Elemento 3</span>
        <span className="text-muted-foreground">Valor 3</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span>Elemento 4</span>
        <span className="text-muted-foreground">Valor 4</span>
      </div>
    </div>
  ),
};

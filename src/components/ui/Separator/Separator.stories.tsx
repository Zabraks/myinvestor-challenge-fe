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

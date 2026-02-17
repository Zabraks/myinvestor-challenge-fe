import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID del elemento de formulario asociado',
    },
  },
  args: {
    children: 'Etiqueta',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Correo electrónico</Label>
      <input
        id="email"
        type="email"
        placeholder="tu@email.com"
        className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="required-field">
        Nombre <span className="text-destructive">*</span>
      </Label>
      <input
        id="required-field"
        type="text"
        required
        className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm"
      />
    </div>
  ),
};

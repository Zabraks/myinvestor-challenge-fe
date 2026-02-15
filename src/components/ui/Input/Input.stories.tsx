import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Valor inicial',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input deshabilitado',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Input con error',
    'aria-invalid': true,
  },
};

export const TypeNumber: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

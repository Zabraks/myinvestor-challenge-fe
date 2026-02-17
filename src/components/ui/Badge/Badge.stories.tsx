import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'green', 'blue', 'red'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Green: Story = {
  args: {
    children: 'Success',
    variant: 'green',
  },
};

export const Blue: Story = {
  args: {
    children: 'Info',
    variant: 'blue',
  },
};

export const Red: Story = {
  args: {
    children: 'Error',
    variant: 'red',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="red">Red</Badge>
    </div>
  ),
};

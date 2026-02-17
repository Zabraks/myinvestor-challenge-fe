import type { Meta, StoryObj } from '@storybook/react-vite';
import { LimitPageSelector } from './LimitPageSelector';

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

export const Default: Story = {};

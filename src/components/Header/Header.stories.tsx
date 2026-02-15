import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithContainer: Story = {
  decorators: [
    (Story) => (
      <div className="border-b">
        <div className="container mx-auto px-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

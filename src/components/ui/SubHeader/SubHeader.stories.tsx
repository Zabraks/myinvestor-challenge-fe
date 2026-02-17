import type { Meta, StoryObj } from '@storybook/react-vite';
import { SubHeader } from './SubHeader';

const meta: Meta<typeof SubHeader> = {
  title: 'UI/SubHeader',
  component: SubHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Categoría',
  },
};

export const InContext: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg overflow-hidden">
      <SubHeader>Tecnología</SubHeader>
      <div className="p-4 space-y-2">
        <div className="text-sm">Fondo Global Tech</div>
        <div className="text-sm">Fondo AI Innovation</div>
      </div>
      <SubHeader>Salud</SubHeader>
      <div className="p-4 space-y-2">
        <div className="text-sm">Fondo Salud Europa</div>
        <div className="text-sm">Fondo BioTech</div>
      </div>
    </div>
  ),
};

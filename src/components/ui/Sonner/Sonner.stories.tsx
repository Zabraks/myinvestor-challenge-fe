import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Toaster } from './Sonner';
import { Button } from '@ui/Button/Button';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <div className="flex gap-2">
          <Button onClick={() => toast('Mensaje por defecto')}>Default</Button>
          <Button onClick={() => toast.success('Operación exitosa')}>Success</Button>
          <Button onClick={() => toast.error('Ha ocurrido un error')}>Error</Button>
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};

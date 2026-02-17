import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './DropdownMenu';
import { Button } from '../Button/Button';
import { EllipsisVertical, Eye, ArrowRightToLine, ArrowRightFromLine, Shuffle } from 'lucide-react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Abrir menú</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuItem>Facturación</DropdownMenuItem>
        <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const FundActions: Story = {
  name: 'Acciones de fondo',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArrowRightToLine /> Comprar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowRightFromLine /> Vender
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Shuffle /> Traspasar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye /> Ver Detalle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

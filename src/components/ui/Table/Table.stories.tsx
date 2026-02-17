import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Juan García</TableCell>
          <TableCell>juan@ejemplo.com</TableCell>
          <TableCell>Administrador</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>María López</TableCell>
          <TableCell>maria@ejemplo.com</TableCell>
          <TableCell>Usuario</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carlos Martín</TableCell>
          <TableCell>carlos@ejemplo.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Lista de fondos de inversión disponibles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ISIN</TableHead>
          <TableHead>Nombre del fondo</TableHead>
          <TableHead className="text-right">Valor liquidativo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>ES0000000001</TableCell>
          <TableCell>MyInvestor Value</TableCell>
          <TableCell className="text-right">124.56 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ES0000000002</TableCell>
          <TableCell>MyInvestor Growth</TableCell>
          <TableCell className="text-right">89.32 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ES0000000003</TableCell>
          <TableCell>MyInvestor Balanced</TableCell>
          <TableCell className="text-right">156.78 €</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ISIN</TableHead>
          <TableHead>Nombre del fondo</TableHead>
          <TableHead className="text-right">Valor liquidativo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
            No hay datos disponibles.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

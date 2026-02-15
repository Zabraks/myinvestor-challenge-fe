import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
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

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Concepto</TableHead>
          <TableHead className="text-right">Importe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Suscripción Fondo A</TableCell>
          <TableCell className="text-right">1.000,00 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Suscripción Fondo B</TableCell>
          <TableCell className="text-right">2.500,00 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Suscripción Fondo C</TableCell>
          <TableCell className="text-right">500,00 €</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right font-bold">4.000,00 €</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const FundsList: Story = {
  render: () => (
    <Table>
      <TableCaption>Fondos de inversión - Actualizado a fecha de hoy</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ISIN</TableHead>
          <TableHead>Fondo</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-right">VL</TableHead>
          <TableHead className="text-right">Rent. YTD</TableHead>
          <TableHead className="text-right">Rent. 1 año</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono text-xs">ES0000000001</TableCell>
          <TableCell className="font-medium">MyInvestor Value</TableCell>
          <TableCell>RV Global</TableCell>
          <TableCell className="text-right">124.56 €</TableCell>
          <TableCell className="text-right text-green-600">+8.45%</TableCell>
          <TableCell className="text-right text-green-600">+12.34%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">ES0000000002</TableCell>
          <TableCell className="font-medium">MyInvestor Growth</TableCell>
          <TableCell>RV Europa</TableCell>
          <TableCell className="text-right">89.32 €</TableCell>
          <TableCell className="text-right text-red-600">-2.15%</TableCell>
          <TableCell className="text-right text-green-600">+5.67%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">ES0000000003</TableCell>
          <TableCell className="font-medium">MyInvestor Balanced</TableCell>
          <TableCell>Mixto Moderado</TableCell>
          <TableCell className="text-right">156.78 €</TableCell>
          <TableCell className="text-right text-green-600">+4.23%</TableCell>
          <TableCell className="text-right text-green-600">+7.89%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">ES0000000004</TableCell>
          <TableCell className="font-medium">MyInvestor Fixed Income</TableCell>
          <TableCell>RF Corto Plazo</TableCell>
          <TableCell className="text-right">102.15 €</TableCell>
          <TableCell className="text-right text-green-600">+1.56%</TableCell>
          <TableCell className="text-right text-green-600">+2.89%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Selectable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" className="h-4 w-4" />
          </TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Importe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell>
            <input type="checkbox" className="h-4 w-4" defaultChecked />
          </TableCell>
          <TableCell>Operación 001</TableCell>
          <TableCell>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
              Completada
            </span>
          </TableCell>
          <TableCell className="text-right">1.500,00 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="checkbox" className="h-4 w-4" />
          </TableCell>
          <TableCell>Operación 002</TableCell>
          <TableCell>
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
              Pendiente
            </span>
          </TableCell>
          <TableCell className="text-right">2.300,00 €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="checkbox" className="h-4 w-4" />
          </TableCell>
          <TableCell>Operación 003</TableCell>
          <TableCell>
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
              Cancelada
            </span>
          </TableCell>
          <TableCell className="text-right">500,00 €</TableCell>
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

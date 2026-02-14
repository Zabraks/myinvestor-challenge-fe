import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Título de la tarjeta</CardTitle>
        <CardDescription>Descripción breve del contenido</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Este es el contenido principal de la tarjeta.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Tarjeta con acciones</CardTitle>
        <CardDescription>Incluye botones en el footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>El contenido de la tarjeta va aquí.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <p>Una tarjeta simple sin header ni footer, solo contenido.</p>
    </Card>
  ),
};

export const FundCard: Story = {
  name: 'Fondo de inversión',
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Fondo Renta Variable Global</CardTitle>
        <CardDescription>ISIN: ES0123456789</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rentabilidad YTD</span>
          <span className="font-medium text-green-600">+8.45%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Valor liquidativo</span>
          <span className="font-medium">125.34 €</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Categoría</span>
          <span className="font-medium">Renta Variable</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ver detalles</Button>
      </CardFooter>
    </Card>
  ),
};

export const GridLayout: Story = {
  name: 'Grid de tarjetas',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="w-[200px]">
          <CardHeader>
            <CardTitle>Tarjeta {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Contenido de ejemplo</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

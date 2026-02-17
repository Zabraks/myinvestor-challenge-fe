import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
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

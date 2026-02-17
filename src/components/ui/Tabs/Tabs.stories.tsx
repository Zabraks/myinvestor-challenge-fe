import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Valor de la pestaña activa por defecto',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab1">Cuenta</TabsTrigger>
        <TabsTrigger value="tab2">Contraseña</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Configuración de cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona la configuración de tu cuenta aquí.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Cambiar contraseña</h3>
          <p className="text-sm text-muted-foreground">Actualiza tu contraseña de forma segura.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          Todos
        </TabsTrigger>
        <TabsTrigger value="rv" className="flex-1">
          Renta Variable
        </TabsTrigger>
        <TabsTrigger value="rf" className="flex-1">
          Renta Fija
        </TabsTrigger>
        <TabsTrigger value="mixed" className="flex-1">
          Mixtos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          Mostrando todos los fondos
        </div>
      </TabsContent>
      <TabsContent value="rv">
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          Mostrando fondos de renta variable
        </div>
      </TabsContent>
      <TabsContent value="rf">
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          Mostrando fondos de renta fija
        </div>
      </TabsContent>
      <TabsContent value="mixed">
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          Mostrando fondos mixtos
        </div>
      </TabsContent>
    </Tabs>
  ),
};

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

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        <TabsTrigger value="reports">Informes</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Resumen general</h3>
          <p className="text-sm text-muted-foreground">
            Vista general de tu cartera de inversiones.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Analíticas</h3>
          <p className="text-sm text-muted-foreground">
            Análisis detallado de rendimiento y métricas.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Informes</h3>
          <p className="text-sm text-muted-foreground">Descarga informes y documentación fiscal.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="active">Activo</TabsTrigger>
        <TabsTrigger value="pending">Pendiente</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Deshabilitado
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Contenido de la pestaña activa.</p>
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Contenido de la pestaña pendiente.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const FundsPortfolio: Story = {
  render: () => (
    <Tabs defaultValue="funds" className="w-full">
      <TabsList>
        <TabsTrigger value="funds">Mis Fondos</TabsTrigger>
        <TabsTrigger value="movements">Movimientos</TabsTrigger>
        <TabsTrigger value="performance">Rentabilidad</TabsTrigger>
      </TabsList>
      <TabsContent value="funds" className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">MyInvestor Value</h4>
              <p className="text-sm text-muted-foreground">ES0000000001</p>
            </div>
            <div className="text-right">
              <p className="font-medium">5.000,00 €</p>
              <p className="text-sm text-green-600">+8.45%</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">MyInvestor Growth</h4>
              <p className="text-sm text-muted-foreground">ES0000000002</p>
            </div>
            <div className="text-right">
              <p className="font-medium">3.200,00 €</p>
              <p className="text-sm text-red-600">-2.15%</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="movements">
        <div className="rounded-lg border p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Suscripción</p>
                <p className="text-sm text-muted-foreground">MyInvestor Value</p>
              </div>
              <p className="text-green-600">+1.000,00 €</p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Reembolso</p>
                <p className="text-sm text-muted-foreground">MyInvestor Growth</p>
              </div>
              <p className="text-red-600">-500,00 €</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="performance">
        <div className="rounded-lg border p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">+5.23%</p>
              <p className="text-sm text-muted-foreground">YTD</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+12.45%</p>
              <p className="text-sm text-muted-foreground">1 año</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+34.67%</p>
              <p className="text-sm text-muted-foreground">3 años</p>
            </div>
          </div>
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

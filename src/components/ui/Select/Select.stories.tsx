import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-75 w-75">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opción 1</SelectItem>
        <SelectItem value="option2">Opción 2</SelectItem>
        <SelectItem value="option3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="country" className="text-sm font-medium">
        País
      </label>
      <Select>
        <SelectTrigger id="country">
          <SelectValue placeholder="Selecciona un país" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="es">España</SelectItem>
          <SelectItem value="mx">México</SelectItem>
          <SelectItem value="ar">Argentina</SelectItem>
          <SelectItem value="co">Colombia</SelectItem>
          <SelectItem value="cl">Chile</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="medium">
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un tamaño" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Pequeño</SelectItem>
        <SelectItem value="medium">Mediano</SelectItem>
        <SelectItem value="large">Grande</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Selección deshabilitada" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opción 1</SelectItem>
        <SelectItem value="option2">Opción 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Funds: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="fund-type" className="text-sm font-medium">
        Fondo
      </label>
      <Select>
        <SelectTrigger id="fund-type">
          <SelectValue placeholder="Selecciona tipo de fondo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rv-global">RV Global</SelectItem>
          <SelectItem value="rv-europa">RV Europa</SelectItem>
          <SelectItem value="rv-usa">RV USA</SelectItem>
          <SelectItem value="rf-corto">RF Corto Plazo</SelectItem>
          <SelectItem value="rf-largo">RF Largo Plazo</SelectItem>
          <SelectItem value="rf-corporativa">RF Corporativa</SelectItem>
          <SelectItem value="mixto-conservador">Mixto Conservador</SelectItem>
          <SelectItem value="mixto-moderado">Mixto Moderado</SelectItem>
          <SelectItem value="mixto-agresivo">Mixto Agresivo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

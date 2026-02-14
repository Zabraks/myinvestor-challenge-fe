import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldContent,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from './Field';

const meta: Meta<typeof Field> = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive'],
      description: 'Orientación del campo',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="name">Nombre</FieldLabel>
      <FieldContent>
        <input
          id="name"
          type="text"
          placeholder="Introduce tu nombre"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        />
      </FieldContent>
    </Field>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldContent>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        />
        <FieldDescription>Utilizaremos tu email para notificaciones importantes.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
      <FieldContent>
        <input
          id="password"
          type="password"
          className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm"
        />
        <FieldError>La contraseña debe tener al menos 8 caracteres.</FieldError>
      </FieldContent>
    </Field>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="toggle" className="flex-1">
        Activar notificaciones
      </FieldLabel>
      <input id="toggle" type="checkbox" className="h-4 w-4" />
    </Field>
  ),
};

export const FieldGroupExample: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="first-name">Nombre</FieldLabel>
        <FieldContent>
          <input
            id="first-name"
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Apellido</FieldLabel>
        <FieldContent>
          <input
            id="last-name"
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          />
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Información personal</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="user-name">Nombre de usuario</FieldLabel>
          <FieldContent>
            <input
              id="user-name"
              type="text"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            />
            <FieldDescription>Este será tu identificador público.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="bio">Biografía</FieldLabel>
          <FieldContent>
            <textarea
              id="bio"
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const WithMultipleErrors: Story = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel htmlFor="complex-password">Contraseña</FieldLabel>
      <FieldContent>
        <input
          id="complex-password"
          type="password"
          className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm"
        />
        <FieldError
          errors={[
            { message: 'Debe tener al menos 8 caracteres' },
            { message: 'Debe incluir al menos un número' },
            { message: 'Debe incluir al menos un carácter especial' },
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

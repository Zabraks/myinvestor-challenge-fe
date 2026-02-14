import type { Meta, StoryObj } from '@storybook/react-vite';
import { RowActionsMenu } from './RowActionsMenu';
import { FundActionDialogProvider } from '@/context/FundActionDialogContext';

/**
 * RowActionsMenu es un menú desplegable que muestra las acciones disponibles
 * para un fondo en la tabla. Permite comprar un fondo o ver sus detalles.
 */
const meta: Meta<typeof RowActionsMenu> = {
  title: 'Features/FundsList/RowActionsMenu',
  component: RowActionsMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FundActionDialogProvider>
        <Story />
      </FundActionDialogProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RowActionsMenu>;

/**
 * Estado por defecto del menú de acciones.
 * Haz clic en el icono de tres puntos para ver las opciones disponibles.
 */
export const Default: Story = {};

/**
 * Ejemplo del menú dentro de un contexto de tabla.
 * Muestra cómo se vería integrado en una fila de tabla.
 */
export const InTableContext: Story = {
  decorators: [
    (Story) => (
      <FundActionDialogProvider>
        <div className="flex items-center justify-end p-4 border rounded">
          <Story />
        </div>
      </FundActionDialogProvider>
    ),
  ],
};

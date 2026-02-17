import type { Meta, StoryObj } from '@storybook/react-vite';
import { RowActionsMenu } from './RowActionsMenu';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { ActionMenuProvider } from '@context/ActionMenuContext';

const mockRowData = {
  original: {
    id: '1',
    name: 'Tech Growth Fund',
    category: 'Technology',
    currency: 'USD',
    profitability: {
      YTD: 15.5,
      oneYear: 25.3,
      threeYears: 45.2,
      fiveYears: 80.1,
    },
  },
};

const meta: Meta<typeof RowActionsMenu> = {
  title: 'Features/FundsList/RowActionsMenu',
  component: RowActionsMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    data: mockRowData,
  },
  decorators: [
    (Story) => (
      <ActionMenuProvider>
        <FundActionDialogProvider>
          <Story />
        </FundActionDialogProvider>
      </ActionMenuProvider>
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
      <ActionMenuProvider>
        <FundActionDialogProvider>
          <div className="flex items-center justify-end p-4 border rounded">
            <Story />
          </div>
        </FundActionDialogProvider>
      </ActionMenuProvider>
    ),
  ],
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Row } from '@tanstack/react-table';
import { RowActionsMenu } from './RowActionsMenu';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { ActionMenuProvider } from '@context/ActionMenuContext';
import type { Fund } from '@domain/fund';

const mockFund: Fund = {
  id: '1',
  name: 'Tech Growth Fund',
  category: 'Salud',
  currency: 'USD',
  value: 15000,
  symbol: 'TGF',
  YTD: 15.5,
  oneYear: 25.3,
  threeYears: 45.2,
  fiveYears: 80.1,
};

const mockRowData = {
  original: mockFund,
} as Row<Fund>;

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
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <ActionMenuProvider>
            <FundActionDialogProvider>
              <Story />
            </FundActionDialogProvider>
          </ActionMenuProvider>
        </QueryClientProvider>
      );
    },
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
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <ActionMenuProvider>
            <FundActionDialogProvider>
              <div className="flex items-center justify-end p-4 border rounded">
                <Story />
              </div>
            </FundActionDialogProvider>
          </ActionMenuProvider>
        </QueryClientProvider>
      );
    },
  ],
};

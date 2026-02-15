import type { Meta, StoryObj } from '@storybook/react-vite';
import { TablePagination } from './TablePagination';

/**
 * TablePagination muestra los controles de navegación por páginas
 * para una tabla. Incluye botones de página anterior/siguiente y
 * enlaces directos a páginas específicas.
 */
const meta: Meta<typeof TablePagination> = {
  title: 'Features/FundsList/TablePagination',
  component: TablePagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    setPage: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TablePagination>;

/**
 * Primera página con múltiples páginas disponibles.
 * Solo muestra el botón de siguiente.
 */
export const FirstPage: Story = {
  args: {
    pagination: {
      page: 1,
      totalPages: 10,
    },
  },
};

/**
 * Página intermedia mostrando botones de navegación
 * tanto hacia adelante como hacia atrás.
 */
export const MiddlePage: Story = {
  args: {
    pagination: {
      page: 5,
      totalPages: 10,
    },
  },
};

/**
 * Última página con solo el botón de anterior visible.
 */
export const LastPage: Story = {
  args: {
    pagination: {
      page: 10,
      totalPages: 10,
    },
  },
};

/**
 * Paginación con pocas páginas (menos de 5).
 * Muestra todas las páginas disponibles.
 */
export const FewPages: Story = {
  args: {
    pagination: {
      page: 2,
      totalPages: 3,
    },
  },
};

/**
 * Paginación con muchas páginas.
 * Muestra una vista truncada con puntos suspensivos.
 */
export const ManyPages: Story = {
  args: {
    pagination: {
      page: 15,
      totalPages: 50,
    },
  },
};

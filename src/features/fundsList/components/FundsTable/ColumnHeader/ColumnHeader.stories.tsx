import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnHeader } from './ColumnHeader';
import type { Column } from '@tanstack/react-table';

const meta: Meta<typeof ColumnHeader> = {
  title: 'Features/FundsList/ColumnHeader',
  component: ColumnHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColumnHeader>;

const createMockColumn = (sortState: false | 'asc' | 'desc') =>
  ({
    getIsSorted: () => sortState,
    getToggleSortingHandler: () => () => undefined,
  }) as unknown as Column<unknown, unknown>;

export const Default: Story = {
  args: {
    column: createMockColumn(false),
    title: 'Nombre del Fondo',
  },
};

export const SortedAscending: Story = {
  args: {
    column: createMockColumn('asc'),
    title: 'Precio',
  },
};

export const SortedDescending: Story = {
  args: {
    column: createMockColumn('desc'),
    title: 'Rentabilidad',
  },
};

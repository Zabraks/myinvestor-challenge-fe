import { ArrowDownUp, ArrowUp, ArrowDown } from 'lucide-react';
import type { Column } from '@tanstack/react-table';
import { Button } from '@ui/Button/Button';

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export const ColumnHeader = <TData, TValue>({
  column,
  title,
}: ColumnHeaderProps<TData, TValue>) => {
  return (
    <Button
      className="flex items-center gap-1"
      variant="link"
      onClick={column.getToggleSortingHandler()}
    >
      {title}
      {{
        asc: <ArrowDown className="size-icon-xs text-icon-selected" />,
        desc: <ArrowUp className="size-icon-xs text-icon-selected" />,
      }[column.getIsSorted() as string] ?? <ArrowDownUp className="size-icon-xs text-icon-base" />}
    </Button>
  );
};

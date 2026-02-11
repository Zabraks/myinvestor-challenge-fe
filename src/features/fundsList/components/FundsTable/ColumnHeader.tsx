import { ArrowDownUp, ArrowUp, ArrowDown } from 'lucide-react';

export const ColumnHeader = ({ column, title }) => {
  return (
    <button className="flex items-center gap-1" onClick={column.getToggleSortingHandler()}>
      {title}
      {{
        asc: <ArrowDown className="size-icon-xs text-icon-selected" />,
        desc: <ArrowUp className="size-icon-xs text-icon-selected" />,
      }[column.getIsSorted() as string] ?? <ArrowDownUp className="size-icon-xs text-icon-base" />}
    </button>
  );
};

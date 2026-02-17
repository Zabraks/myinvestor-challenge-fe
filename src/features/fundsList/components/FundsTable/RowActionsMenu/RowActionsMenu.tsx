import { Button } from '@ui/Button/Button';
import { EllipsisVertical } from 'lucide-react';
import { useActionMenu } from '@context/ActionMenuContext';
import type { Row } from '@tanstack/react-table';
import type { Fund } from '@domain/fund';

interface RowActionsMenuProps {
  data: Row<Fund>;
}

export const RowActionsMenu = ({ data }: RowActionsMenuProps) => {
  const { open } = useActionMenu();
  const rowData = data.original;

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open(rowData, rect, 'table');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-icon-selected p-0 cursor-pointer"
      onClick={openMenu}
    >
      <span className="sr-only">abrir menu</span>
      <EllipsisVertical />
    </Button>
  );
};

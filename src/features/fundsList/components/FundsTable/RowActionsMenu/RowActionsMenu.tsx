import { Button } from '@ui/Button/Button';
import { EllipsisVertical } from 'lucide-react';
import { useActionMenu } from '@context/ActionMenuContext';

export const RowActionsMenu = ({ data }) => {
  const { open } = useActionMenu();
  const rowData = data.original;

  const openMenu = (e) => {
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

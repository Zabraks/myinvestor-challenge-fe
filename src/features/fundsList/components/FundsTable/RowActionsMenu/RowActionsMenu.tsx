import { Button } from '@ui/Button/Button';
import { useFundActionDialog } from '@context/FundActionDialogContext';
import { EllipsisVertical, Eye, ArrowRightToLine } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@ui/DropdownMenu/DropdownMenu';

export const RowActionsMenu = ({ data }) => {
  const { openDialog } = useFundActionDialog();

  const rowData = data.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-icon-selected p-0 cursor-pointer">
          <span className="sr-only">abrir menu</span>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openDialog('buy', rowData)}>
          <ArrowRightToLine />
          Comprar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openDialog('show', rowData)}>
          <Eye />
          Ver Detalle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

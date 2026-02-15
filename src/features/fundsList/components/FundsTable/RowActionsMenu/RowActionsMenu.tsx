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

export const RowActionsMenu = () => {
  const { openDialog } = useFundActionDialog();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-icon-selected p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openDialog('buy')}>
          <ArrowRightToLine />
          Comprar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openDialog('show')}>
          <Eye />
          Ver Detalle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

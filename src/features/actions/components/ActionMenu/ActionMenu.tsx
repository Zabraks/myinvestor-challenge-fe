import { useActionMenu } from '@context/ActionMenuContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@ui/DropdownMenu/DropdownMenu';
import { Eye, ArrowRightToLine, ArrowRightFromLine, Shuffle } from 'lucide-react';
import { useFundActionDialog } from '@context/FundActionDialogContext';
import type { ActionType, ActionData } from '@domain/action';

const OPTIONS_MENU = [
  {
    title: 'Comprar',
    icon: <ArrowRightToLine />,
    action: 'buy',
    origin: ['table', 'portfolio'],
  },
  {
    title: 'Vender',
    icon: <ArrowRightFromLine />,
    action: 'sell',
    origin: ['portfolio'],
  },
  {
    title: 'Traspasar',
    icon: <Shuffle />,
    action: 'transfer',
    origin: ['portfolio'],
  },
  {
    title: 'Ver detalle',
    icon: <Eye />,
    action: 'show',
    origin: ['table', 'portfolio'],
  },
];

export function ActionMenu() {
  const { isOpen, data, anchorRect, origin, close } = useActionMenu<ActionData>();
  const { openDialog } = useFundActionDialog();

  if (!isOpen || !anchorRect || !data || !origin) return null;

  return (
    <DropdownMenu open onOpenChange={close}>
      <DropdownMenuContent
        style={{
          position: 'fixed',
          top: anchorRect.bottom,
          left: anchorRect.left - 90,
        }}
      >
        {OPTIONS_MENU.filter((i) => i.origin.includes(origin)).map((item) => (
          <DropdownMenuItem
            key={item.action}
            onClick={() => openDialog(item.action as ActionType, data)}
          >
            {item.icon} {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

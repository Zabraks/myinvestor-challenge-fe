import { Eye, ArrowRightToLine, ArrowRightFromLine, Shuffle } from 'lucide-react';
import type { ActionType } from '@domain/action';

interface MenuOption {
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  action: ActionType;
  origin: ('table' | 'portfolio')[];
}

export const OPTIONS_MENU: MenuOption[] = [
  {
    title: 'Comprar',
    shortTitle: 'Comprar',
    icon: <ArrowRightToLine />,
    action: 'buy',
    origin: ['table', 'portfolio'],
  },
  {
    title: 'Vender',
    shortTitle: 'Vender',
    icon: <ArrowRightFromLine />,
    action: 'sell',
    origin: ['portfolio'],
  },
  {
    title: 'Traspasar',
    shortTitle: 'Traspasar',
    icon: <Shuffle />,
    action: 'transfer',
    origin: ['portfolio'],
  },
  {
    title: 'Ver detalle',
    shortTitle: 'Detalle',
    icon: <Eye />,
    action: 'show',
    origin: ['table', 'portfolio'],
  },
];

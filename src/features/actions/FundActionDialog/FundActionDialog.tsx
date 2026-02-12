import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';

import { BuyFundForm } from '@features/actions/components/BuyFundForm';
import { SellFundForm } from '@features/actions/components/SellFundForm';
import { FundDetails } from '@features/actions/components/FundDetails';

export type FundAction = 'buy' | 'sell' | 'transfer' | 'show';

export interface Fund {
  id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

interface FundActionDialogProps {
  readonly open: boolean;
  readonly action: FundAction | null;
  readonly data: Fund | null;
  readonly onClose: () => void;
}

const ACTION_CONFIG = {
  buy: {
    title: 'Comprar fondo',
    component: BuyFundForm,
  },
  sell: {
    title: 'Vender fondo',
    component: SellFundForm,
  },
  // transfer: {
  //   title: 'Traspasar fondo',
  //   component: TransferFundForm,
  // },
  show: {
    title: 'Detalles del fondo',
    component: FundDetails,
  },
} as const;

export function FundActionDialog({ open, action, data, onClose }: FundActionDialogProps) {
  if (!data || !action) return null;

  const config = ACTION_CONFIG[action];
  const ContentComponent = config.component;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'buy' && 'Comprar fondo'}
            {action === 'sell' && 'Vender fondo'}
            {action === 'transfer' && 'Traspasar fondo'}
            {action === 'show' && 'Detalles del fondo'}
          </DialogTitle>
        </DialogHeader>
        <ContentComponent data={data} onSuccess={onClose} action={action} />
      </DialogContent>
    </Dialog>
  );
}

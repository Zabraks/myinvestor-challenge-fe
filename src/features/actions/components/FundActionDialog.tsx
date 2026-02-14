import type { ComponentType } from 'react';
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@ui/Dialog/Dialog';

import { BuyFundForm } from '@features/actions/components/BuyFundForm';
import { SellFundForm } from '@features/actions/components/SellFundForm';
import { FundDetails } from '@features/actions/components/FundDetails';
import { TransferFundForm } from '@features/actions/components/TransferFundForm';

import type { DialogAction } from '@context/FundActionDialogContext';
import type { FundTableItem } from '@domain/funds/types';

interface ConfigItem {
  title: string;
  component: ComponentType<FundActionProps>;
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
  transfer: {
    title: 'Traspasar fondo',
    component: TransferFundForm,
  },
  show: {
    title: 'Detalles del fondo',
    component: FundDetails,
  },
} as const satisfies Record<DialogAction, ConfigItem>;

export interface FundActionProps {
  fundId: string;
  action?: DialogAction;
  onSuccess?: () => void;
  data?: FundTableItem;
}

export function FundActionDialog({ open, action, data, fundId, onClose }) {
  if (!fundId || !action) return null;

  const config = ACTION_CONFIG[action];
  const ContentComponent = config.component;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{data?.name}</DialogDescription>
        </DialogHeader>
        <ContentComponent data={data} onSuccess={onClose} action={action} fundId={fundId} />
      </DialogContent>
    </Dialog>
  );
}

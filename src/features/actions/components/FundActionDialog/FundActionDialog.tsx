import type { ComponentType } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';

import { BuyFundForm } from '@/features/actions/components/BuyFundForm/BuyFundForm';
import { SellFundForm } from '@/features/actions/components/SellFundForm/SellFundForm';
import { FundDetails } from '@/features/actions/components/FundDetails/FundDetails';
import { TransferFundForm } from '@/features/actions/components/TransferFundForm/TransferFundForm';

import type { ActionType, ActionData } from '@domain/action';
import type { FundActionFormProps } from '@features/actions/types';

interface FundActionDialogProps {
  readonly open: boolean;
  readonly action: ActionType | null;
  readonly data: ActionData | null;
  readonly fundId: string | null;
  readonly onClose: () => void;
}

type ActionConfig = {
  title: string;
  component: ComponentType<FundActionFormProps> | ComponentType<Pick<FundActionFormProps, 'data'>>;
};

const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
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
};

export function FundActionDialog({ open, action, data, fundId, onClose }: FundActionDialogProps) {
  if (!data || !action) return null;

  const config = ACTION_CONFIG[action];
  const ContentComponent = config.component;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
        </DialogHeader>
        <ContentComponent data={data} onSuccess={onClose} action={action} fundId={fundId} />
      </DialogContent>
    </Dialog>
  );
}

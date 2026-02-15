import type { ComponentType } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';

import { BuyFundForm } from '@features/actions/components/BuyFundForm';
import { SellFundForm } from '@features/actions/components/SellFundForm';
import { FundDetails } from '@features/actions/components/FundDetails';
import type { FundActionType, FundActionData } from '@domain/funds/types';
import type { FundActionFormProps } from '@features/actions/types';

interface FundActionDialogProps {
  readonly open: boolean;
  readonly action: FundActionType | null;
  readonly data: FundActionData | null;
  readonly onClose: () => void;
}

type ActionConfig = {
  title: string;
  component: ComponentType<FundActionFormProps> | ComponentType<Pick<FundActionFormProps, 'data'>>;
};

const ACTION_CONFIG: Record<FundActionType, ActionConfig> = {
  buy: {
    title: 'Comprar fondo',
    component: BuyFundForm,
  },
  sell: {
    title: 'Vender fondo',
    component: SellFundForm,
  },
  show: {
    title: 'Detalles del fondo',
    component: FundDetails,
  },
};

export function FundActionDialog({ open, action, data, onClose }: FundActionDialogProps) {
  if (!data || !action) return null;

  const config = ACTION_CONFIG[action];
  const ContentComponent = config.component;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
        </DialogHeader>
        <ContentComponent data={data} onSuccess={onClose} action={action} />
      </DialogContent>
    </Dialog>
  );
}

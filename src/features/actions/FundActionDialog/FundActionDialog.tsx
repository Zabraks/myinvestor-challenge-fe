import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';

export type FundAction = 'buy' | 'sell' | 'transfer' | 'show';

export interface Fund {
  id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

interface FundActionDialogProps {
  readonly open: boolean;
  readonly action: FundAction | null;
  readonly fund: Fund | null;
  readonly onClose: () => void;
}

export function FundActionDialog({ open, action, fund, onClose }: FundActionDialogProps) {
  if (!fund || !action) return null;

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

        {/* Aquí va el formulario correspondiente */}
      </DialogContent>
    </Dialog>
  );
}

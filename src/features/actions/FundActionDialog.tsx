import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog/Dialog';

export function FundActionDialog({ open, action, fund, onClose }) {
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

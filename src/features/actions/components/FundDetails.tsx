import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Button } from '@ui/Button/Button';

export const FundDetails = () => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cerrar</Button>
      </DialogClose>
    </DialogFooter>
  );
};

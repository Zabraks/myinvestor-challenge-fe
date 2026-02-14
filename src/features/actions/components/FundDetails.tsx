import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Button } from '@ui/Button/Button';

import { useFundDetails } from '@features/actions/queries/useFundDetails';
import { getCoin } from '@lib/utils';
import { FundDetailsSkeleton } from './FundDetailsSkeleton';
import type { FundActionProps } from './FundActionDialog';

export const FundDetails = ({ fundId }: FundActionProps) => {
  const { data: fundDetails, isLoading } = useFundDetails({
    fundId,
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      {isLoading ? (
        <FundDetailsSkeleton />
      ) : (
        <>
          <h3 className="font-bold text-xl">
            {fundDetails?.name} ({fundDetails?.symbol})
          </h3>
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <span className="font-bold text-lg">Categoria</span>
              <span>{fundDetails?.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-right">Valor</span>
              <span>{`${fundDetails?.value} ${getCoin(fundDetails?.currency)}`}</span>
            </div>
          </div>
          <div className="flex flex-col w-full text-left">
            <span className="font-bold text-lg">Rentabilidad</span>
            <p>
              <span className="font-semibold">Año hasta la fecha:</span> {fundDetails?.YTD}
            </p>
            <p>
              <span className="font-semibold">1 año:</span> {fundDetails?.oneYear}
            </p>
            <p>
              <span className="font-semibold">3 años:</span> {fundDetails?.threeYears}
            </p>
            <p>
              <span className="font-semibold">5 años:</span> {fundDetails?.fiveYears}
            </p>
          </div>
        </>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

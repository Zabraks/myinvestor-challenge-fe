import { Skeleton } from '@ui/Skeleton/Skeleton';

export const FundDetailsSkeleton = () => {
  return (
    <>
      <div className="flex items-center">
        <Skeleton className="h-4 w-37.5" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 w-18.75" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-4 w-15" />
          <Skeleton className="h-4 w-25" />
        </div>
      </div>
      <div className="flex flex-col w-full text-left gap-1">
        <Skeleton className="h-4 w-37.5" />
        <div className="flex flex-col mt-2 gap-1">
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-31.25" />
          <Skeleton className="h-4 w-31.25" />
          <Skeleton className="h-4 w-31.25" />
        </div>
      </div>
    </>
  );
};

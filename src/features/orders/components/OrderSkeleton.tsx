import { Item, ItemContent, ItemGroup } from '@ui/Item/Item';
import { Skeleton } from '@ui/Skeleton/Skeleton';

export const OrderSkeleton = ({ size = 5 }) => {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-1">
        {[...Array(size)].map((_item, key) => (
          <Item key={`skeleton-item-${key}`} variant="outline" role="listitem">
            <ItemContent>
              <Skeleton className="h-4 w-25" />
              <Skeleton className="h-4 w-37.5" />
              <Skeleton className="h-4 w-18.75" />
            </ItemContent>
            <ItemContent className="flex flex-col text-end">
              <Skeleton className="h-4 w-8.75" />
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
};

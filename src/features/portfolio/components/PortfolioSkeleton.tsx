import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from '@ui/Item/Item';
import { Skeleton } from '@ui/Skeleton/Skeleton';

export const PortfolioSkeleton = ({ size = 3 }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup className="gap-4">
        {[...Array(size)].map((_item, key) => (
          <Item key={`skeleton-item-${key}`} variant="outline" role="listitem">
            <ItemMedia>
              <Skeleton className="h-6 w-6 rounded-full" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">
                <Skeleton className="h-4 w-[150px]" />
              </ItemTitle>
            </ItemContent>
            <ItemContent className="flex flex-col text-end">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-[50px]" />
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
};

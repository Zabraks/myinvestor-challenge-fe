import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@ui/Item/Item';
import { Badge } from '@ui/Badge/Badge';

import { ChevronsDown, Coins } from 'lucide-react';

import type { OrderView } from '@domain/order';

//TODO darle una vuelta a esto
const TONE_CLASSES = {
  blue: 'text-blue-700',
  red: 'text-red-700',
  green: 'text-green-700',
};

export const OrderItem = ({ item }: { item: OrderView }) => {
  return (
    <Item className="border-b-2 border-b-secondary rounded-none gap-1">
      <ItemHeader>
        <ItemDescription className="text-xs">{item.dateLabel}</ItemDescription>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{item.fundName}</ItemTitle>
        {item.fundDestinationName && (
          <>
            <ChevronsDown className="w-5 text-secondary" />
            <ItemTitle className="line-clamp-1">{item.fundDestinationName}</ItemTitle>
          </>
        )}
        <div>
          <Badge variant={item.tone}>{item.type}</Badge>
        </div>
      </ItemContent>
      <ItemContent className="flex flex-col text-end">
        <ItemDescription className={`flex font-bold items-end text-lg ${TONE_CLASSES[item.tone]}`}>
          {item.quantityLabel} <Coins className="pl-1 w-5.5" />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

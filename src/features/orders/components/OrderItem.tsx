import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@ui/Item/Item';
import { Badge } from '@ui/Badge/Badge';

import { ChevronsDown } from 'lucide-react';

import type { OrderViewModel } from '@services/orders/orderToView.api.types';

//TODO darle una vuelta a esto
const TONE_CLASSES = {
  blue: 'text-blue-700',
  red: 'text-red-700',
  green: 'text-green-700',
};

export const OrderItem = ({ item }: { item: OrderViewModel }) => {
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
        <ItemDescription>
          <Badge variant={item.tone}>{item.type}</Badge>
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex flex-col text-end">
        <ItemDescription className={`font-bold text-lg ${TONE_CLASSES[item.tone]}`}>
          {item.quantityLabel}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

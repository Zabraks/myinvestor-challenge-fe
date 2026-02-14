import type { PortfolioItemType } from '@domain/portfolio/models';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from '@ui/Item/Item';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@ui/DropdownMenu/DropdownMenu';

import { Button } from '@ui/Button/Button';

import { EllipsisVertical, Eye, ArrowRightToLine, ChartNoAxesCombined } from 'lucide-react';

import { useInteractionMode } from '@lib/hooks/useInteractiveMode';
import { useFundActionDialog } from '@context/FundActionDialogContext';
import { PortfolioActionsSwipe } from '@features/actions/components/PortfolioActionsSwipe';
import { SwipeableRow } from '@features/actions/components/SwipeableRow';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

//TODO Refactor
export const PortfolioItem = ({ item }: PortfolioItemProps) => {
  const { openDialog } = useFundActionDialog();
  const { mode } = useInteractionMode();

  return mode === 'touch' ? (
    <SwipeableRow actions={<PortfolioActionsSwipe item={item} />}>
      <Item key={item.name} variant="outline" role="listitem">
        <ItemMedia variant="icon">
          <ChartNoAxesCombined />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{item.name}</ItemTitle>
        </ItemContent>
        <ItemContent className="flex flex-col text-end">
          <ItemDescription>{item.totalValue}</ItemDescription>
          <ItemDescription>{item.quantity} Participaciones</ItemDescription>
        </ItemContent>
      </Item>
    </SwipeableRow>
  ) : (
    <Item key={item.name} variant="outline" role="listitem">
      <ItemMedia variant="icon">
        <ChartNoAxesCombined />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">{item.name}</ItemTitle>
      </ItemContent>
      <ItemContent className="flex flex-col text-end">
        <ItemDescription>{item.totalValue}</ItemDescription>
        <ItemDescription>{item.quantity} Participaciones</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-icon-selected p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openDialog('buy', item.id, item)}>
              <ArrowRightToLine />
              Comprar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openDialog('show', item.id, item)}>
              <Eye />
              Ver Detalle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

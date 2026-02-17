import type { PortfolioItem as PortfolioItemType } from '@domain/portfolio';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from '@ui/Item/Item';

import { useInteractionMode, type InteractionMode } from '@hooks/useInteractiveMode';
import { SwipeActionMenu } from '@/features/actions/components/ActionMenu/SwipeActionMenu';
import { SwipeableRow } from '@features/actions/components/SwipeableRow';
import { useActionMenu } from '@context/ActionMenuContext';
import { Button } from '@ui/Button/Button';
import { EllipsisVertical, ChartNoAxesCombined, Coins } from 'lucide-react';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

interface BasicItemProps {
  data: PortfolioItemType;
  mode: InteractionMode;
}

const BasicItem = ({ data, mode }: BasicItemProps) => {
  const { open } = useActionMenu<PortfolioItemType>();

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open(data, rect, 'portfolio');
  };

  return (
    <Item variant="outline" role="listitem">
      <ItemMedia variant="icon">
        <ChartNoAxesCombined />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-md font-bold">{data.name}</ItemTitle>
        <ItemDescription className="flex">
          <span>Participaciones: </span>
          <span className="pl-1.5 font-bold">{data.quantity}</span> <Coins className="w-3" />
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex flex-col text-end items-end">
        <span>Valor</span>
        <ItemDescription className="font-bold">{data.totalValue}</ItemDescription>
      </ItemContent>
      {mode === 'mouse' && (
        <ItemActions>
          <Button
            variant="ghost"
            size="icon"
            className="text-icon-selected p-0 cursor-pointer"
            onClick={openMenu}
          >
            <span className="sr-only">abrir menu</span>
            <EllipsisVertical />
          </Button>
        </ItemActions>
      )}
    </Item>
  );
};

export const PortfolioItem = ({ item }: PortfolioItemProps) => {
  const { mode } = useInteractionMode();

  return mode === 'touch' ? (
    <SwipeableRow actions={<SwipeActionMenu item={item} />}>
      <BasicItem data={item} mode={mode} />
    </SwipeableRow>
  ) : (
    <BasicItem data={item} mode={mode} />
  );
};

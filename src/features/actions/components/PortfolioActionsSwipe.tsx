import { Item, ItemContent, ItemMedia, ItemTitle, ItemGroup } from '@ui/Item/Item';

import type { PortfolioItemType } from '@domain/portfolio/models';
import { useFundActionDialog } from '@context/FundActionDialogContext';

import { Eye, ArrowRightToLine, ArrowRightFromLine, Shuffle } from 'lucide-react';

export const PortfolioActionsSwipe = ({ item }: { item: PortfolioItemType }) => {
  const { openDialog } = useFundActionDialog();

  return (
    <ItemGroup className="grid grid-cols-4 h-full w-full items-center justify-end bg-secondary">
      <Item variant="action" role="listitem" size="sm" onClick={() => openDialog('buy', item)}>
        <ItemMedia variant="iconAction">
          <ArrowRightToLine />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Comprar</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="action" role="listitem" size="sm" onClick={() => openDialog('sell', item)}>
        <ItemMedia variant="iconAction">
          <ArrowRightFromLine />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Vender</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="action" role="listitem" size="sm" onClick={() => openDialog('transfer', item)}>
        <ItemMedia variant="iconAction">
          <Shuffle />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Traspasar</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="action" role="listitem" size="sm" onClick={() => openDialog('show', item)}>
        <ItemMedia variant="iconAction">
          <Eye />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Ver Detalle</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
};

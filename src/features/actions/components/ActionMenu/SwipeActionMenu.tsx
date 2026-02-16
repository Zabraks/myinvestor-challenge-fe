import { Item, ItemContent, ItemMedia, ItemTitle, ItemGroup } from '@ui/Item/Item';

import type { PortfolioItem } from '@domain/portfolio';
import { useFundActionDialog } from '@context/FundActionDialogContext';
import { OPTIONS_MENU } from './const';

export const SwipeActionMenu = ({ item }: { item: PortfolioItem }) => {
  const { openDialog } = useFundActionDialog();

  return (
    <ItemGroup className="grid grid-cols-4 h-full w-full items-center justify-end bg-secondary">
      {OPTIONS_MENU.map((option) => (
        <Item
          key={option.action}
          variant="action"
          role="listitem"
          size="sm"
          onClick={() => openDialog(option.action, item)}
        >
          <ItemMedia variant="iconAction">{option.icon}</ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">{option.shortTitle}</ItemTitle>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
};

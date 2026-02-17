import { Card, CardContent } from '@ui/Card/Card.tsx';
import { ItemGroup, ItemTitle, Item } from '@ui/Item/Item';
import { useNavigate, useLocation } from 'react-router-dom';
import { ITEMS_MENU } from './const';

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed flex items-center justify-center bottom-4 left-0 w-full z-50 md:min-w-40 md:relative md:justify-start md:w-auto md:bottom-auto">
      <Card className="pt-4 md:min-w-40">
        <CardContent>
          <ItemGroup className="flex gap-2 flex-row justify-center md:flex-col">
            {ITEMS_MENU.map((item) => {
              const Icon = item.icon;
              return (
                <Item
                  onClick={() => navigate(item.pathname)}
                  variant={location.pathname === item.pathname ? 'selected' : 'default'}
                  className="cursor-pointer p-3 hover:border-secondary/50"
                  key={item.title}
                >
                  <Icon className="w-4" />
                  <ItemTitle className="text-sm">{item.title}</ItemTitle>
                </Item>
              );
            })}
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  );
};

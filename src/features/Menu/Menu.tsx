import { Card, CardContent } from '@ui/Card/Card.tsx';
import { Link, useLocation } from 'react-router-dom';
import { ITEMS_MENU } from './const';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ui/Navigation/Navigation';

export const Menu = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed flex items-center justify-center bottom-4 left-0 w-full z-50 md:min-w-40 md:relative md:justify-start md:w-auto md:bottom-auto">
      <Card className="pt-4 md:min-w-40">
        <CardContent>
          <NavigationMenu>
            <NavigationMenuList className="gap-3 md:flex-col">
              {ITEMS_MENU.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.pathname;
                return (
                  <NavigationMenuItem key={item.title} className="w-full">
                    <NavigationMenuLink asChild active={isActive}>
                      <Link
                        to={item.pathname}
                        data-active={isActive || undefined}
                        className="font-bold rounded-md p-3 border border-transparent data-[active=true]:border-secondary/50 data-[active=true]:bg-secondary/5 hover:border-secondary/50 hover:bg-secondary/5 flex justify-center items-center gap-3"
                      >
                        <Icon className="w-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    </div>
  );
};

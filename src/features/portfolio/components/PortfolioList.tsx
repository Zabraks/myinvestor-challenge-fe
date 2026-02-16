import { Fragment } from 'react';
import type { PortfolioItemType } from '@domain/portfolio/models';
import { ItemGroup } from '@ui/Item/Item';

import { PortfolioItem } from '@features/portfolio/components/PortfolioItem';

import type { CategoryGroup } from '@domain/portfolio/utils/groupByCategory';
import { InfoSection } from '@ui/InfoSection/InfoSection';
import { BanknoteX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '@ui/SubHeader/SubHeader';

export const PortfolioList = ({ items }: { items: CategoryGroup<PortfolioItemType>[] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup className="gap-4">
        {items.length ? (
          items.map(({ nameCategory, items: subItems }) => (
            <Fragment key={nameCategory}>
              <SubHeader>{nameCategory}</SubHeader>
              {subItems.map((item) => (
                <PortfolioItem key={item.id} item={item} />
              ))}
            </Fragment>
          ))
        ) : (
          <InfoSection
            action={() => navigate('/funds')}
            buttonText="Ver fondos disponibles"
            title="Aún no tienes fondos en tu cartera"
            description="Explora el listado de fondos y comienza a invertir."
            icon={<BanknoteX />}
          />
        )}
      </ItemGroup>
    </div>
  );
};

import { Card, CardContent, CardHeader } from '@ui/Card/Card.tsx';

import { usePortfolioViewModel } from '@features/portfolio/hooks/usePortfolioViewModel';

import { PortfolioList } from '@features/portfolio/components/PortfolioList';
import { PortfolioSkeleton } from '@features/portfolio/components/PortfolioSkeleton';
import { InfoSection } from '@ui/InfoSection/InfoSection';
import { useNavigate } from 'react-router-dom';
import { OctagonX } from 'lucide-react';

export const PortfolioSection = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data: enrichedPortfolio } = usePortfolioViewModel();
  return (
    <Card className="bg-card md:min-w-4xl">
      <CardHeader>
        <h2 className="font-bold">Mis fondos</h2>
      </CardHeader>
      <CardContent className="md:w-rull">
        {isLoading && <PortfolioSkeleton />}
        {isError && (
          <InfoSection
            action={() => navigate(0)}
            title="Error"
            buttonText="Volver a intentarlo"
            description="Ha habido un error al obtener tu porfolio. Intentalo de nuevo o ponte en contacto con el
          administrador"
            icon={<OctagonX />}
          />
        )}
        {!isLoading && !isError && <PortfolioList items={enrichedPortfolio || []} />}
      </CardContent>
    </Card>
  );
};

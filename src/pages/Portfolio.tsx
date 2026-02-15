import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs/Tabs.tsx';
import { Card, CardContent } from '@ui/Card/Card.tsx';
import { usePortfolio } from '@features/portfolio/queries/usePortfolio';
import EmptyPortfolio from '@features/portfolio/components/EmptyPortfolio/EmptyPortfolio';

const Portfolio = () => {
  const { data, isLoading, isError } = usePortfolio();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold mb-4">Mi portfolio</h2>
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList className="justify-start w-full mb-4">
          <TabsTrigger value="overview">Fondos</TabsTrigger>
          <TabsTrigger value="transactions">Órdenes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="bg-card">
            <CardContent>
              {isLoading && <p>Cargando...</p>}
              {isError && <p>Error al cargar el portfolio</p>}
              {data?.data.length === 0 && <EmptyPortfolio />}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardContent>
              <p>Contenido de la pestaña de Órdenes</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;

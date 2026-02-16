import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs/Tabs.tsx';

import { OrderSection } from '@features/orders/components/OrderSection';
import { PortfolioSection } from '@features/portfolio/components/PortfolioSection';

const Portfolio = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Tabs defaultValue="portfolio" className="w-full max-w-lg">
        <TabsList className="justify-start w-full mb-4">
          <TabsTrigger value="portfolio">Fondos</TabsTrigger>
          <TabsTrigger value="orders">Órdenes</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          <PortfolioSection />
        </TabsContent>
        <TabsContent value="orders">
          <OrderSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;

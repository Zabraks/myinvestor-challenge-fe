import { OrderList } from '@features/orders/components/OrderList';
import { OrderSkeleton } from '@features/orders/components/OrderSkeleton';
import { InfoSection } from '@ui/InfoSection/InfoSection';
import { Card, CardContent, CardHeader } from '@ui/Card/Card.tsx';

import { useOrders } from '@features/orders/queries/useOrders';

import { mapOrderToView } from '@services/orders/orderToView.mapper';
import { OctagonX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrderSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useOrders();

  const dataMapped = data.map(mapOrderToView);

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold">Ordenes</h2>
      </CardHeader>
      <CardContent>
        {isLoading && <OrderSkeleton size={3} />}
        {isError && (
          <InfoSection
            action={() => navigate(0)}
            title="Error"
            buttonText="Volver a intentarlo"
            description="Ha habido un error al obtener el listado de ordenes. Intentalo de nuevo o ponte en contacto con el
          administrador"
            icon={<OctagonX />}
          />
        )}
        {!isLoading && !isError && <OrderList items={dataMapped} />}
      </CardContent>
    </Card>
  );
};

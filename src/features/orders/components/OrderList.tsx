import { ItemGroup } from '@ui/Item/Item';
import { OrderItem } from '@features/orders/components/OrderItem';
import { InfoSection } from '@ui/InfoSection/InfoSection';
import type { OrderViewModel } from '@services/orders/orderToView.api.types';

import { Logs } from 'lucide-react';

export const OrderList = ({ items }: { items: OrderViewModel[] }) => {
  return (
    <ItemGroup className="gap-1">
      {items.length ? (
        items.map((order) => <OrderItem key={order.id} item={order} />)
      ) : (
        <InfoSection
          title="Aún no se han registrado operaciones"
          description="No hay registros de ordenes de compra, venta o traspaso con tus fondos"
          icon={<Logs />}
        />
      )}
    </ItemGroup>
  );
};

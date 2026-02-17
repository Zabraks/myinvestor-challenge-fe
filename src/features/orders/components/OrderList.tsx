import { ItemGroup } from '@ui/Item/Item';
import { InfoSection } from '@ui/InfoSection/InfoSection';
import { OrderItem } from '@features/orders/components/OrderItem';
import type { OrderView } from '@domain/order';

import { Logs } from 'lucide-react';

export const OrderList = ({ items }: { items: OrderView[] }) => {
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

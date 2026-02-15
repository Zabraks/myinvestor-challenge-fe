import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const actionFactory = Factory.define(({ params }) => {
  const previousBalance = faker.number.int({ min: 0, max: 1000 });
  const totalQuantity = (params.data?.portfolio?.[0]?.quantity ?? 0) + previousBalance;

  return {
    message: 'Purchase successful',
    data: {
      portfolio: [
        {
          id: params.data?.portfolio?.[0]?.id,
          quantity: totalQuantity,
        },
      ],
    },
  };
});

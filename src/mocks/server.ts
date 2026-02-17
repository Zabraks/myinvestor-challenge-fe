import { setupServer } from 'msw/node';
import {
  fundListHandlers,
  fundDetailHandlers,
  buyFundHandlers,
  sellFundHandlers,
  transferFundHandlers,
  portfolioHandlers,
} from '@mocks/handlers';

export const server = setupServer(
  ...fundListHandlers,
  ...fundDetailHandlers,
  ...buyFundHandlers,
  ...sellFundHandlers,
  ...transferFundHandlers,
  ...portfolioHandlers
);

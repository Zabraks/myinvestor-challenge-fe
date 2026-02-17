import { setupWorker } from 'msw/browser';
import {
  fundListHandlers,
  fundDetailHandlers,
  buyFundHandlers,
  sellFundHandlers,
  transferFundHandlers,
  portfolioHandlers,
} from '@mocks/handlers';

export const worker = setupWorker(
  ...fundListHandlers,
  ...fundDetailHandlers,
  ...buyFundHandlers,
  ...sellFundHandlers,
  ...transferFundHandlers,
  ...portfolioHandlers
);

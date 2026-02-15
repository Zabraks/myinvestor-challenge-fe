import { setupWorker } from 'msw/browser';
import { fundListHandlers, buyFundHandlers } from '@mocks/handlers';

export const worker = setupWorker(...fundListHandlers, ...buyFundHandlers);

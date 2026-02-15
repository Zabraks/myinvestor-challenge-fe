import { setupServer } from 'msw/node';
import { fundListHandlers, buyFundHandlers } from '@mocks/handlers';

export const server = setupServer(...fundListHandlers, ...buyFundHandlers);

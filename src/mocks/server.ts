import { setupServer } from 'msw/node';
import { handlers } from './fundsList.handlers';

export const server = setupServer(...handlers);

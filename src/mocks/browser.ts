import { setupWorker } from 'msw/browser';
import { handlers } from './fundsList.handlers';

export const worker = setupWorker(...handlers);

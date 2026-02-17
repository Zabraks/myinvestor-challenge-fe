import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@mocks/server';
import { resetPortfolioStore } from '@mocks/store';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  resetPortfolioStore();
});

afterAll(() => server.close());

/* eslint-disable @typescript-eslint/no-empty-function */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

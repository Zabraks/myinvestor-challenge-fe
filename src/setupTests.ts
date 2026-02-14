import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@mocks/server';

// Inicializar el servidor de mocks antes de todos los tests
beforeAll(() => server.listen());

// Limpiar los handlers después de cada test
afterEach(() => server.resetHandlers());

// Limpiar el servidor después de todos los tests
afterAll(() => server.close());

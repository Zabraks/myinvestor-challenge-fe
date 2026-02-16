import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para tests E2E.
 *
 * Decisiones técnicas:
 * - Separamos tests por proyecto (desktop, mobile) para ejecutarlos de forma independiente
 * - Usamos webServer para levantar la app automáticamente antes de los tests
 */
export default defineConfig({
  /* Directorio raíz de tests */
  testDir: './tests',

  /* Directorio para resultados (traces, videos, screenshots de fallos) */
  outputDir: './tests/test-results',

  /* Timeout por test - 30s es suficiente para una app de este tamaño */
  timeout: 30 * 1000,

  /* Timeout para expect() - evita falsos positivos por renders lentos */
  expect: {
    timeout: 10 * 1000,
  },

  /* Sin reintentos en desarrollo para feedback rápido */
  retries: process.env.CI ? 2 : 0,

  /* Ejecutar tests en paralelo - máximo de workers según entorno */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter: lista en desarrollo, HTML en CI para análisis detallado */
  reporter: process.env.CI ? 'html' : 'list',

  /* Configuración compartida entre todos los proyectos */
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',

    /* Capturar trace solo en primer reintento para debugging */
    trace: 'on-first-retry',

    /* Screenshot en caso de fallo */
    screenshot: 'only-on-failure',
  },

  /* Proyectos: Desktop, Mobile y Visual (desktop + mobile) */
  projects: [
    {
      name: 'desktop-chrome',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile-chrome',
      testDir: './tests/e2e',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'visual-desktop',
      testDir: './tests/visual',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      /* Los tests visuales necesitan snapshots de referencia */
      snapshotDir: './tests/visual/__snapshots__',
    },
    {
      name: 'visual-mobile',
      testDir: './tests/visual',
      use: {
        ...devices['Pixel 5'],
      },
      snapshotDir: './tests/visual/__snapshots__',
    },
  ],

  /* Levantar servidor de desarrollo antes de ejecutar tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutos para el build inicial
  },
});

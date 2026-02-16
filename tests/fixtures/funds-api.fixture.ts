import { test as base, type Page, type Route } from '@playwright/test';
import {
  generateMockFundsResponse,
  generateMockBuyFundsResponse,
  generateMockSellFundsResponse,
  generateMockTransferFundsResponse,
  generateMockPortfolioResponse,
  generateMockFundDetailResponse,
  type MockFundsConfig,
  type MockBuyConfig,
  type MockSellConfig,
  type MockTransferConfig,
  type MockPortfolioFullConfig,
  type MockFundDetailConfig,
} from '../utils/mock-data';

interface FundsFixtures {
  fundsPage: Page;
  mockFundsApi: (config?: MockFundsConfig) => Promise<void>;
  mockBuyApi: (config?: MockBuyConfig) => Promise<void>;
  mockSellApi: (config?: MockSellConfig) => Promise<void>;
  mockTransferApi: (config?: MockTransferConfig) => Promise<void>;
  mockPortfolioApi: (config?: MockPortfolioFullConfig) => Promise<void>;
  mockFundDetailApi: (config?: MockFundDetailConfig) => Promise<void>;
}

export const test = base.extend<FundsFixtures>({
  fundsPage: async ({ page }, use) => {
    await page.route('**/localhost:3000/funds', (route) => handleFundsRoute(route));
    await page.route('**/localhost:3000/funds/**', (route) => handleFundDetailRoute(route));
    await page.route('**/localhost:3000/funds/*/buy', (route) => handleBuyFundRoute(route));
    await page.route('**/localhost:3000/funds/*/sell', (route) => handleSellFundRoute(route));
    await page.route('**/localhost:3000/funds/transfer', (route) => handleTransferFundRoute(route));
    await page.route('**/localhost:3000/portfolio', (route) => handlePortfolioRoute(route));
    await use(page);
  },

  mockFundsApi: async ({ page }, use) => {
    const configureMock = async (config?: MockFundsConfig) => {
      await page.route('**/localhost:3000/funds', (route) => handleFundsRoute(route, config));
    };

    await use(configureMock);
  },

  mockBuyApi: async ({ page }, use) => {
    const configureMock = async (config?: MockBuyConfig) => {
      await page.route('**/localhost:3000/funds/*/buy', (route) =>
        handleBuyFundRoute(route, config)
      );
    };

    await use(configureMock);
  },

  mockSellApi: async ({ page }, use) => {
    const configureMock = async (config?: MockSellConfig) => {
      await page.route('**/localhost:3000/funds/*/sell', (route) =>
        handleSellFundRoute(route, config)
      );
    };

    await use(configureMock);
  },

  mockTransferApi: async ({ page }, use) => {
    const configureMock = async (config?: MockTransferConfig) => {
      await page.route('**/localhost:3000/funds/transfer', (route) =>
        handleTransferFundRoute(route, config)
      );
    };

    await use(configureMock);
  },

  mockPortfolioApi: async ({ page }, use) => {
    const configureMock = async (config?: MockPortfolioFullConfig) => {
      await page.route('**/localhost:3000/portfolio', (route) =>
        handlePortfolioRoute(route, config)
      );
    };

    await use(configureMock);
  },

  mockFundDetailApi: async ({ page }, use) => {
    const configureMock = async (config?: MockFundDetailConfig) => {
      await page.route(/\/localhost:3000\/funds\/[^/]+$/, (route) => {
        if (route.request().method() === 'GET') {
          return handleFundDetailRoute(route, config);
        }
        return route.continue();
      });
    };

    await use(configureMock);
  },
});

async function handleFundsRoute(route: Route, config?: MockFundsConfig): Promise<void> {
  const url = new URL(route.request().url());
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
  const limit = Number.parseInt(url.searchParams.get('limit') || '10', 10);
  const sort = url.searchParams.get('sort') || undefined;

  const response = generateMockFundsResponse({
    page,
    limit,
    sort,
    totalFunds: config?.totalFunds,
    seed: config?.seed,
  });

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

async function handleBuyFundRoute(route: Route, config?: MockBuyConfig): Promise<void> {
  const request = route.request();
  const url = request.url();

  const urlParts = url.split('/');
  const fundId = urlParts[urlParts.length - 2];

  const body = request.postDataJSON();
  const quantity = body?.amount;

  const response = generateMockBuyFundsResponse({
    fundId,
    quantity,
  });

  if (config?.onCapture) {
    config.onCapture({ fundId, quantity, ...body });
  }

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

async function handleSellFundRoute(route: Route, config?: MockSellConfig): Promise<void> {
  const request = route.request();
  const url = request.url();

  const urlParts = url.split('/');
  const fundId = urlParts[urlParts.length - 2];

  const body = request.postDataJSON();
  const quantity = body?.quantity;

  const response = generateMockSellFundsResponse({
    fundId,
    quantity,
  });

  if (config?.onCapture) {
    config.onCapture({ fundId, quantity, ...body });
  }

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

async function handleTransferFundRoute(route: Route, config?: MockTransferConfig): Promise<void> {
  const request = route.request();
  const body = request.postDataJSON();

  const response = generateMockTransferFundsResponse({
    fromFundId: body?.fromFundId,
    toFundId: body?.toFundId,
    quantity: body?.quantity,
  });

  if (config?.onCapture) {
    config.onCapture({
      fromFundId: body?.fromFundId,
      toFundId: body?.toFundId,
      quantity: body?.quantity,
    });
  }

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

async function handlePortfolioRoute(route: Route, config?: MockPortfolioFullConfig): Promise<void> {
  const response = generateMockPortfolioResponse(config);

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

async function handleFundDetailRoute(route: Route, config?: MockFundDetailConfig): Promise<void> {
  const url = route.request().url();
  const urlParts = url.split('/');
  const fundId = config?.fundId ?? urlParts[urlParts.length - 1];

  const response = generateMockFundDetailResponse(fundId);

  if (config?.delay) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }

  if (config?.shouldFail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  });
}

export { expect } from '@playwright/test';

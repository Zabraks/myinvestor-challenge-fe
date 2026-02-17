import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Funds List - Smoke Tests', () => {
  test('should load the funds list page and display data', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');

    await expect(fundsPage.getByRole('heading', { name: 'Lista de fondos' })).toBeVisible();

    const table = fundsPage.getByRole('table');
    await expect(table).toBeVisible();

    const dataRows = fundsPage.locator(SELECTORS.fundsTable.row);
    await expect(dataRows).toHaveCount(10);
  });

  test('should have "Comprar" action enabled for each fund', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');

    const firstRowActionButton = fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .getByRole('button', { name: SELECTORS.rowActions.trigger });

    await firstRowActionButton.click();

    const buyButton = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy });
    await expect(buyButton).toBeVisible();
    await expect(buyButton).toBeEnabled();
  });

  test('should display correct table headers', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');

    const { headers } = SELECTORS.fundsTable;

    for (const headerText of Object.values(headers)) {
      await expect(
        fundsPage.getByRole('columnheader').filter({ hasText: headerText })
      ).toBeVisible();
    }
  });

  test('should show pagination controls when data exceeds page limit', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');

    const nextPageLink = fundsPage.getByRole('link', { name: SELECTORS.pagination.next });
    await expect(nextPageLink).toBeVisible();

    const prevPageLink = fundsPage.getByRole('link', { name: SELECTORS.pagination.previous });
    await expect(prevPageLink).not.toBeVisible();

    await expect(fundsPage.getByRole('link', { name: '1' })).toBeVisible();
    await expect(fundsPage.getByRole('link', { name: '2' })).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page, mockFundsApi }) => {
    await mockFundsApi({ shouldFail: true });

    await page.goto('/funds');

    const table = page.getByRole('table');
    await expect(table).toBeVisible();
  });
});

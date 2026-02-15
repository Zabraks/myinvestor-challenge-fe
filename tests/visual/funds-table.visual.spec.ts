import { test, expect } from '../fixtures/funds-api.fixture';
import { SELECTORS } from '../utils/selectors';

test.describe('Funds Table - Visual Regression', () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();
  });

  test('should match baseline for funds table', async ({ fundsPage }) => {
    await expect(fundsPage.getByRole('table')).toHaveScreenshot('funds-table.png', {
      animations: 'disabled',
    });
  });

  test('should match baseline for full page view', async ({ fundsPage }) => {
    await expect(fundsPage).toHaveScreenshot('funds-page-full.png', {
      fullPage: false,
      animations: 'disabled',
    });
  });

  test('should match baseline for pagination controls', async ({ fundsPage }) => {
    const paginationArea = fundsPage.locator('.flex.justify-between').last();
    await expect(paginationArea).toHaveScreenshot('pagination-controls.png');
  });

  test('should match baseline for table header row', async ({ fundsPage }) => {
    const tableHeader = fundsPage.locator('thead');
    await expect(tableHeader).toHaveScreenshot('table-header.png');
  });
});

test.describe('Funds Table - Visual States', () => {
  test('should match baseline for sorted column indicator', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await fundsPage.getByRole('button', { name: 'Nombre' }).click();

    const tableHeader = fundsPage.locator('thead');
    await expect(tableHeader).toHaveScreenshot('table-header-sorted.png');
  });

  test('should match baseline for row actions menu open', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await fundsPage
      .locator('tbody tr')
      .first()
      .getByRole('button', { name: SELECTORS.rowActions.trigger })
      .click();

    await expect(fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy })).toBeVisible();

    await expect(fundsPage).toHaveScreenshot('row-actions-menu-open.png', {
      animations: 'disabled',
    });
  });

  test('should match baseline for empty state', async ({ page, mockFundsApi }) => {
    await mockFundsApi({ totalFunds: 0 });
    await page.goto('/funds');

    await expect(page.getByText('No results.')).toBeVisible();

    await expect(page.getByRole('table')).toHaveScreenshot('funds-table-empty.png');
  });

  test('should match baseline for different page sizes', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await fundsPage.getByRole('combobox').click();
    await fundsPage.getByRole('option', { name: '25' }).click();

    await expect(fundsPage.locator('tbody tr')).toHaveCount(25);

    await expect(fundsPage.getByRole('table')).toHaveScreenshot('funds-table-25-items.png');
  });
});

test.describe('Funds Table - Responsive Visual Tests', () => {
  test('should match baseline for table on current viewport', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    // Este screenshot tendrá un nombre diferente según el proyecto:
    // - visual-desktop: funds-table-responsive-desktop-chrome.png
    // - visual-mobile: funds-table-responsive-mobile-chrome.png
    await expect(fundsPage).toHaveScreenshot('funds-table-responsive.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match baseline for header navigation on current viewport', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');

    const header = fundsPage.locator('header').first();
    if (await header.isVisible()) {
      await expect(header).toHaveScreenshot('header-responsive.png');
    }
  });
});

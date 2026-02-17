import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Funds List - Pagination', () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator(SELECTORS.fundsTable.row).first()).toBeVisible();
  });

  test('should navigate to next page', async ({ fundsPage }) => {
    const firstCellPage1 = await fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first()
      .textContent();

    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();

    await expect(fundsPage.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    const firstCellPage2 = await fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first()
      .textContent();

    expect(firstCellPage2).not.toBe(firstCellPage1);
  });

  test('should navigate to previous page', async ({ fundsPage }) => {
    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();
    await expect(fundsPage.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    await fundsPage.getByRole('link', { name: SELECTORS.pagination.previous }).click();

    await expect(fundsPage.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  test('should hide "Previous" button on first page', async ({ fundsPage }) => {
    const previousButton = fundsPage.getByRole('link', { name: SELECTORS.pagination.previous });
    await expect(previousButton).not.toBeVisible();
  });

  test('should hide "Next" button on last page', async ({ fundsPage }) => {
    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();
    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();

    await expect(fundsPage.getByRole('link', { name: '3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    const nextButton = fundsPage.getByRole('link', { name: SELECTORS.pagination.next });
    await expect(nextButton).not.toBeVisible();
  });

  test('should change items per page using the limit selector', async ({ fundsPage }) => {
    await expect(fundsPage.locator(SELECTORS.fundsTable.row)).toHaveCount(10);

    const limitSelector = fundsPage.getByRole(SELECTORS.limitSelector.trigger, {
      name: SELECTORS.limitSelector.name,
    });
    await limitSelector.click();

    await fundsPage.getByRole('option', { name: SELECTORS.limitSelector.options[2] }).click();

    await expect(fundsPage.getByRole('link', { name: '3' })).not.toBeVisible();

    await expect(limitSelector).toContainText(SELECTORS.limitSelector.options[2]);
  });

  test('should reset to page 1 when changing items per page', async ({ fundsPage }) => {
    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();
    await expect(fundsPage.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    const limitSelector = fundsPage.getByRole(SELECTORS.limitSelector.trigger, {
      name: SELECTORS.limitSelector.name,
    });
    await limitSelector.click();
    await fundsPage.getByRole('option', { name: SELECTORS.limitSelector.options[2] }).click();

    await expect(fundsPage.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});

test.describe('Funds List - Pagination Edge Cases', () => {
  test('should handle empty results gracefully', async ({ page, mockFundsApi }) => {
    await mockFundsApi({ totalFunds: 0 });

    await page.goto('/funds');

    await expect(page.getByText(SELECTORS.fundsTable.emptyState)).toBeVisible();
  });

  test('should handle single item correctly', async ({ page, mockFundsApi }) => {
    await mockFundsApi({ totalFunds: 1 });

    await page.goto('/funds');

    await expect(page.locator(SELECTORS.fundsTable.row)).toHaveCount(1);

    await expect(page.getByRole('link', { name: SELECTORS.pagination.previous })).not.toBeVisible();
    await expect(page.getByRole('link', { name: SELECTORS.pagination.next })).not.toBeVisible();
  });
});

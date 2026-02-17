import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Actions - Fund detail', () => {
  test.describe('from Funds page', () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.goto('/funds');

      const firstRowActionButton = fundsPage
        .locator(SELECTORS.fundsTable.row)
        .first()
        .getByRole('button', { name: SELECTORS.rowActions.trigger });

      await firstRowActionButton.click();
    });

    test('should open dialog with fund details clicking "Ver detalle" action', async ({
      fundsPage,
    }) => {
      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');

      const titleDialog = dialog.getByRole('heading', { name: SELECTORS.detailDialog.title });
      await expect(titleDialog).toBeVisible();
    });

    test('should display fund name and symbol in the details dialog', async ({ fundsPage }) => {
      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');

      const fundName = dialog.locator('h3');
      await expect(fundName).toBeVisible();
      await expect(fundName).toContainText('(');
    });

    test('should display fund category and value', async ({ fundsPage }) => {
      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');

      const categoryLabel = dialog.getByText('Categoria');
      await expect(categoryLabel).toBeVisible();

      const valueLabel = dialog.getByText('Valor');
      await expect(valueLabel).toBeVisible();
    });

    test('should display fund profitability section', async ({ fundsPage }) => {
      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');

      const profitabilityLabel = dialog.getByText('Rentabilidad');
      await expect(profitabilityLabel).toBeVisible();

      const ytdLabel = dialog.getByText('Año hasta la fecha:');
      await expect(ytdLabel).toBeVisible();

      const oneYearLabel = dialog.getByText('1 año:');
      await expect(oneYearLabel).toBeVisible();

      const threeYearsLabel = dialog.getByText('3 años:');
      await expect(threeYearsLabel).toBeVisible();

      const fiveYearsLabel = dialog.getByText('5 años:');
      await expect(fiveYearsLabel).toBeVisible();
    });

    test('should close dialog when clicking close button', async ({ fundsPage }) => {
      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const closeButton = dialog.getByRole('button', { name: /cerrar/i });
      await closeButton.click();

      await expect(dialog).toBeHidden();
    });

    test('should show error state when API fails', async ({ fundsPage, mockFundDetailApi }) => {
      await mockFundDetailApi({
        shouldFail: true,
      });

      const viewDetailsButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.viewDetails,
      });
      await viewDetailsButton.click();
      const dialog = fundsPage.getByRole('dialog');

      const errorTitle = dialog.getByText('Error', { exact: true });
      await expect(errorTitle).toBeVisible();
    });
  });

  test.describe('from Portfolio page', () => {
    test.beforeEach(async ({ fundsPage, swipeItem }) => {
      await fundsPage.goto('/portfolio');

      const fundItem = fundsPage.getByRole('listitem').first();
      await swipeItem(fundItem);

      const detailItem = fundsPage.getByText(SELECTORS.swipeActions.viewDetails).first();
      detailItem.click();
    });

    test('should open dialog with fund details from portfolio', async ({ fundsPage }) => {
      const dialog = fundsPage.getByRole('dialog');

      const titleDialog = dialog.getByRole('heading', { name: SELECTORS.detailDialog.title });
      await expect(titleDialog).toBeVisible();
    });

    test('should display fund details with all sections from portfolio', async ({ fundsPage }) => {
      const dialog = fundsPage.getByRole('dialog');

      const fundName = dialog.locator('h3');
      await expect(fundName).toBeVisible();

      const categoryLabel = dialog.getByText('Categoria');
      await expect(categoryLabel).toBeVisible();

      const valueLabel = dialog.getByText('Valor');
      await expect(valueLabel).toBeVisible();

      const profitabilityLabel = dialog.getByText('Rentabilidad');
      await expect(profitabilityLabel).toBeVisible();
    });
  });
});

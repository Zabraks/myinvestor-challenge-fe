import { test, expect } from '../fixtures/funds-api.fixture';
import { SELECTORS } from '../utils/selectors';

test.describe('Visual - Funds List', () => {
  test('Funds table', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await expect(fundsPage).toHaveScreenshot('funds-tabla.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Table sorted by name', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await fundsPage.getByRole('button', { name: 'Nombre' }).click();

    await expect(fundsPage).toHaveScreenshot('funds-tabla-ordenada.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Dropdown menu', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await fundsPage
      .locator('tbody tr')
      .first()
      .getByRole('button', { name: SELECTORS.rowActions.trigger })
      .click();

    await expect(fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy })).toBeVisible();

    await expect(fundsPage).toHaveScreenshot('funds-acciones-dropdown.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Visual - Portfolio', () => {
  test('Porfolio with categorized funds', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');
    await expect(fundsPage.getByRole('listitem').first()).toBeVisible();

    await expect(fundsPage).toHaveScreenshot('portfolio-fondos.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Visual - Órdenes', () => {
  test('Order section after buy a fund', async ({ fundsPage, mockBuyApi }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator('tbody tr').first()).toBeVisible();

    await mockBuyApi({});

    await fundsPage
      .locator('tbody tr')
      .first()
      .getByRole('button', { name: SELECTORS.rowActions.trigger })
      .click();

    await fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy }).click();

    const dialog = fundsPage.getByRole('dialog');
    await dialog.getByLabel(SELECTORS.buyDialog.inputName).fill('100');
    await dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton }).click();

    await expect(dialog).toBeHidden();

    await fundsPage.goto('/portfolio');
    await fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders }).click();

    await expect(fundsPage.getByText(SELECTORS.orders.types.buy)).toBeVisible();

    await expect(fundsPage).toHaveScreenshot('ordenes-despues-compra.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

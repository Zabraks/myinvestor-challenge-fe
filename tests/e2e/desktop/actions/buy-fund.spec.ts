import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';
import type { MockBuyFund } from '../../../utils/mock-data';

test.describe('Actions - Buy fund', () => {
  test.describe('from Funds page', () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.goto('/funds');

      const firstRowActionButton = fundsPage
        .locator(SELECTORS.fundsTable.row)
        .first()
        .getByRole('button', { name: SELECTORS.rowActions.trigger });

      await firstRowActionButton.click();

      const buyButton = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy });
      await buyButton.click();
    });

    test('should open dialog with buyFund form clicking "Comprar" action', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const titleDialog = dialog.getByRole('heading', { name: SELECTORS.buyDialog.title });
      await expect(titleDialog).toBeVisible();

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await expect(input).toBeVisible();
    });

    test('should buyFund form and buy a fund successfully', async ({ fundsPage, mockBuyApi }) => {
      let capturedPayload: MockBuyFund | null = null;

      await mockBuyApi({
        onCapture: (data) => {
          capturedPayload = data;
        },
      });

      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.buy.success);

      expect(capturedPayload.quantity).toBe(100);
      await expect(dialog).toBeHidden();
      await expect(toastMsg).toBeVisible();
    });

    test('should buyFund form and see a toast error message when api fails', async ({
      fundsPage,
      mockBuyApi,
    }) => {
      await mockBuyApi({
        shouldFail: true,
      });

      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.buy.error);

      await expect(dialog).toBeVisible();
      await expect(toastMsg).toBeVisible();
    });

    test('should buyFund form and see a validation error when clear the input', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.clear();

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.number);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when type a negative value', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('-100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.positive);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when type zero value', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('0');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.positive);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when a value up to max limit', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('10000000');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.maxValue);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });
  });

  test.describe('from Portfolio page', () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.goto('/portfolio');

      const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
      const firstPortfolioItem = portfolioPanel.getByRole('listitem').first();
      const actionButton = firstPortfolioItem.getByRole('button', {
        name: SELECTORS.rowActions.trigger,
      });

      await actionButton.click();

      const buyButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.buy,
      });
      await buyButton.click();
    });

    test('should open dialog with buyFund form clicking "Comprar" action', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const titleDialog = dialog.getByRole('heading', { name: SELECTORS.buyDialog.title });
      await expect(titleDialog).toBeVisible();

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await expect(input).toBeVisible();
    });

    test('should buyFund form and buy a fund successfully', async ({ fundsPage, mockBuyApi }) => {
      let capturedPayload: MockBuyFund | null = null;

      await mockBuyApi({
        onCapture: (data) => {
          capturedPayload = data;
        },
      });

      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.buy.success);

      expect(capturedPayload.quantity).toBe(100);
      await expect(dialog).toBeHidden();
      await expect(toastMsg).toBeVisible();
    });

    test('should buyFund form and see a toast error message when api fails', async ({
      fundsPage,
      mockBuyApi,
    }) => {
      await mockBuyApi({
        shouldFail: true,
      });

      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.buy.error);

      await expect(dialog).toBeVisible();
      await expect(toastMsg).toBeVisible();
    });

    test('should buyFund form and see a validation error when clear the input', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.clear();

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.number);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when type a negative value', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('-100');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.positive);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when type zero value', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('0');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.positive);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });

    test('should buyFund form and see a validation error when a value up to max limit', async ({
      fundsPage,
    }) => {
      const dialog = fundsPage.getByRole('dialog');

      const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
      await input.fill('10000000');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
      await sendButton.click();

      const errorMsg = fundsPage.getByText(SELECTORS.validations.buy.maxValue);

      await expect(errorMsg).toBeVisible();
      await expect(dialog).toBeVisible();
    });
  });
});
